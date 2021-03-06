const router = require('express').Router();


/* --------------ROUTES GO HERE--------------- */
//router.use()
router.use('/users', require('./users'))

router.use((req, res, next) => {
    const err = new Error('Not found.')
    err.status = 404
    next(err)
})

module.exports = router;