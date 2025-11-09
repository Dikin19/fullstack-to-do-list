const express = require('express')
const TodoController = require('../controllers/todoController')
const customer = express.Router()


customer.post('/testing', (req, res) => {

  const { username } = req.body

  console.log(username, 'hasil dari body')

  res.json({ message: 'customer name success', username })
})

customer.get('/find-all-todos', TodoController.findAllTodo)
customer.post('/create-todo', TodoController.createTodo)
customer.put('/update-todo/:id',TodoController.updateTodo)
customer.delete('/delete/:id', TodoController.deleteTodo)




module.exports = customer