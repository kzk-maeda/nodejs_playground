'use strict'
const express = require('express')
let todos = [
  {id: 1, title: 'Name', completed: false},
  {id: 2, title: 'Draft', completed: true},
]

const app = express()
app.use(express.json())

// get all todo lists
app.get('/api/todos', (req, res) => {
  if (!req.query.completed) {
    return res.json(todos)
  }
  // filter todos when complete query parameter is sent
  const completed = req.query.completed === 'true'
  res.json(todos.filter(todo => todo.completed === completed))
})

let id = 2

// create new item in todo list
app.post('/api/todos', (req, res, next) => {
  // console.log(req)
  const { title } = req.body
  if (typeof title !== 'string' || !title) {
    // return status code 400 if title is not contained in request body
    const err = new Error('title is required')
    err.statusCode = 400
    return next(err)
  }
  // create todo
  const todo = {id: id += 1, title, completed: false}
  todos.push(todo)
  // return status code 201(created)
  res.status(201).json(todo)
})

// id handling Middleware
app.use('/api/todos/:id(\\d+)', (req, res, next) => {
  const targetId = Number(req.params.id)
  const todo = todos.find(todo => todo.id === targetId)
  if (!todo) {
    const err = new Error('Todo not found')
    err.statusCode = 404
    return next(err)
  }
  req.todo = todo
  next()
})

// todo completed
app.route('/api/todos/:id(\\d+)/completed')
  .put((req, res) => {
    req.todo.completed = true
    res.json(req.todo)
  })
  .delete((req, res) => {
    req.todo.completed = false
    res.json(req.todo)
  })

// delete todo
app.delete('/api/todos/:id(\\d+)', (req, res) => {
  todos = todos.filter(todo => todo !== req.todo)
  res.status(204).end()
})

// Error handling Middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({ error: err.message })
})

app.listen(3000)

// for Next.js routing
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(
  // Servee-side routing
  () => app.get('*', nextApp.getRequestHandler()),
  err => {
    console.error(err)
    process.exit(1)
  }
)