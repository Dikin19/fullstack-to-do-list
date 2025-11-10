const express = require('express')

const router = express.Router()
const auth = require('./auth');
const admin = require('./admin')
const authentication = require('../midlewares/authentication');
const query = require('./query');
const customer = require('./customer');


router.use('/auths', auth)
router.use('/queries', query)

// authentication middleware of all admin and customers api
router.use('/customers', authentication, customer)
router.use('/admins', authentication, admin)

module.exports = router;