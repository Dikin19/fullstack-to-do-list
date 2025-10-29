const express = require('express')

const router = express.Router()
const auth = require('./auth');
const admin = require('./admin')


router.use('/auths', auth)
router.use('/admins', admin)

module.exports = router;