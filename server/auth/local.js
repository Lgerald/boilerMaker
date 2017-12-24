const localRouter = require("express").Router();
const { User } = require('../models')


localRouter.post("/login", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        res.status(401).send("user not found");
      } else if (
        User.encryptPassword(req.body.password, user.salt) !== user.password
      ) {
        res.status(401).send("incorrect password");
      } else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

localRouter.post("/logout", (req, res, next) => {
  req.logout();
  res.sendStatus(200, "successfully logged out");
});

localRouter.post("/signup", (req, res, next) => {
  const { email, password } = req.body;
  User.findOrCreate({
    where: { email }
  })
    .spread((user, bool) => {
      if (bool) {
        user.update({ password }).then(newUser =>
          req.login(newUser, err => {
            if (err) next(err);
            else res.json(newUser);
          })
        );
      } else {
        res.redirect("/login");
      }
    })
    .catch(next);
});

localRouter.get("/me", (req, res, next) => {
  res.json(req.user);
});

module.exports = localRouter



