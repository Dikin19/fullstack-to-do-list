const express = require('express');
const AuthController = require('../controllers/queryController');
const query = express.Router()



query.post('/', (req, res) => {

    const {name} = req.body

    console.log('masuk gak nama dari body: ', name);

});

query.post('/register', AuthController.register )
query.post('/login', AuthController.login )
query.get('/getAllUsers', AuthController.getAllUsers)
query.put('/updatePut/:id', AuthController.updateUserReturning )
// query.put('/updatePut/:id', AuthController.updateUser) sama dengan updateUserReturning hanya beda logic.
query.patch('/updatePatch/:id', AuthController.updateUserByPatch )
query.patch('/updatePatch', AuthController.updateUserByPatchQuery)
query.delete('/:id',AuthController.deleteById)



module.exports = query