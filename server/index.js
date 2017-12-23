const path = require('path')
const { db, User } = require('./models')
const express = require('express')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require('passport')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();

const dbStore = new SequelizeStore({ db })

dbStore.sync()
      .then(() => {
        console.log('Session store synced')
      })
      .catch(console.error)

app.use(session({
  secret: process.env.SESSION_SECRET || "super duper secret code goes here",
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done)
})

app.use(function (req, res, next) {
  console.log('SESSION: ', req.session);
  console.log('USER ', req.user)
  next();
});

app.use(express.static(path.join(__dirname, '../public')))

// Any routes / middlewares
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./api'))

app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal Error")
});

module.exports = app;