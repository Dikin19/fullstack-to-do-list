const express = require('express')

const router = express.Router()
const auth = require('./auth');


router.use('/auths', auth)
// router.use('/admins', user)

module.exports = router;