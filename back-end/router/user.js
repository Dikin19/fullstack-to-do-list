const express = require('express');
const UserController = require('../controllers/UserController');

const user = express.Router()


user.post('/register', UserController.register )

module.exports = user;