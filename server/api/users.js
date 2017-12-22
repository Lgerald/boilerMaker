const userRouter = require('express').Router()
const { User } = require('../models')

 
userRouter.get('/', (req,res,next) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(next)
})

userRouter.post('/', (req,res,next) => {
    const { email, password } = req.body
    User.findOrCreate({
        where: {
            email
        }
    })
    .spread((user, bool) =>{
        if (bool) {
            user
              .update({ password })
              .then(newUser => res.status(201).json(newUser));  
        }
        else {res.send("user exists, please login")}
    })
    .catch(next)
})

module.exports = userRouter