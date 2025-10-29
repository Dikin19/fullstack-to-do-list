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



module.exports = admin
 