const express = require('express')
const AdminController = require('../controllers/adminController')
const admin = express.Router()

admin.post('/testing', (req, res) => {
  const { username } = req.body
  console.log(username, 'hasil dari body')
  res.json({ message: 'Admin edit success', username })
})

admin.get('/find-all-users', AdminController.findAllUsers)
admin.put('/update/:id', AdminController.updateUser)
admin.patch('/updatePatch/:id', AdminController.updateUserByPatch ) // untuk satu field by params
admin.patch('/updatePatch', AdminController.updateUserByPatchQuery) // untuk satu field by query



module.exports = admin
 