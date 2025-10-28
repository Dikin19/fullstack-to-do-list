const express = require('express');
const UserController = require('../controllers/UserController');

const user = express.Router()


user.post('/register', UserController.register )

user.post('/login', UserController.login )

user.post('/testinglogin', (req, res) => {

    const {email, password} = req.body

    console.log(email, password);


})

module.exports = user;