const express = require('express');
const AuthController = require('../controllers/authController');
const auth = express.Router()


auth.post('/register', AuthController.register )

auth.post('/login', AuthController.login )

auth.post('/testinglogin', (req, res) => {

    const {email, password} = req.body

    console.log(email, password, 'ini hasil dari body');

    res.json({
        message: 'api masuk dan berhasil request',
        email,
        password

     })


})




module.exports = auth;