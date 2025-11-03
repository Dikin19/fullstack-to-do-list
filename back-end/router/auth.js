const express = require('express');
const AuthController = require('../controllers/authController');
const auth = express.Router()


auth.post('/register', AuthController.register )
auth.post('/login', AuthController.login )

// Example of a protected route: requires a valid Bearer token.
// NOTE: keep `/register` (and `/login`) public so users can create accounts and obtain tokens.
auth.post('/testinglogin', (req, res) => {
    const { email, password } = req.body

    console.log(email, password, 'hasil dari body');

    res.json({
        message: 'Protected route: request succeeded',
        email,
        password,
        userFromToken: req.user,
    })
})




module.exports = auth;