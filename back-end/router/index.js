const express = require('express')

const router = express.Router()
const auth = require('./auth');
const admin = require('./admin')
const authentication = require('../midlewares/authentication')


router.use('/auths', auth)

// authentication middleware of all admin api
router.use('/admins', authentication, admin)

module.exports = router;