const express = require('express')
const authorizationStaff = require('../midlewares/authorization')
const UserController = require('../controllers/userController')
const ProfileController = require('../controllers/profileController')
const admin = express.Router()

admin.post('/testing', (req, res) => {
  const { username } = req.body
  console.log(username, 'hasil dari body')
  res.json({ message: 'Admin edit success', username })
})

// user routes
admin.get('/find-all-users', UserController.findAllUsers)
admin.put('/update/:id', authorizationStaff, UserController.updateUser)
admin.patch('/updatePatch/:id', UserController.updateUserByPatch ) // untuk satu field by params
admin.patch('/updatePatch', UserController.updateUserByPatchQuery) // untuk satu field by query  
admin.delete('/delete/:id', authorizationStaff, UserController.deleteById) //soft delete

// profile routes // soft delete
admin.get('/find-all-profiles',ProfileController.findAllProfiles)




module.exports = admin