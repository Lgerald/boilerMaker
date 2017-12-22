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
            user.password = password
            res.status(201).json(user)
        }
        else {
            if (password === user.password) {
                res.status(302).json(user)
            } else {
                res.send("user exists, but invalid password, please try again")
            }
        }
    })
    .catch(next)
})

module.exports = userRouter