const authRouter = require('express').Router();


authRouter.use("/google", require('./google'))
authRouter.use('/local', require('./local'))


module.exports = authRouter