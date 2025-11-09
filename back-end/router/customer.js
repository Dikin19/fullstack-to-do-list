const express = require('express')
const CustomerController = require('../controllers/customerController')
const customer = express.Router()


customer.post('/testing', (req, res) => {

  const { username } = req.body

  console.log(username, 'hasil dari body')

  res.json({ message: 'customer name success', username })
})

customer.get('/find-all-todo', CustomerController.findAllTodo)

module.exports = customer