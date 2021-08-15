'use strict'
const express = require('express')
let todos = [
  {id: 1, title: 'Name', completed: false},
  {id: 2, title: 'Draft', completed: true},
]

const app = express()

// get all todo lists
app.get('/api/todos', (req, res) => {
  if (!req.query.completed) {
    return res.json(todos)
  }
  // filter todos when complete query parameter is sent
  const completed = req.query.completed === 'true'
  res.json(todos.filter(todo => todo.completed === completed))
})

app.listen(3000)