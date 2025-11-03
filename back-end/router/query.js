const express = require('express');
const AuthController = require('../controllers/queryController');
const query = express.Router()



query.post('/', (req, res) => {

    const {name} = req.body

    console.log('masuk gak nama dari body: ', name);

});

query.post('/register', AuthController.register )
query.post('/login', AuthController.login )



module.exports = query