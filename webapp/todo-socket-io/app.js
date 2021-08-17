'use strict'
const http = require('http')
const next = require('next')
const Server = require('socket.io')

let todos = [
  { id: 1, title: 'Name', completed: false },
  { id: 2, title: 'Draft', completed: true },
]

// variable for manage todo's id
let id = 2

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(
  () => {
    // run createServer() using request handler
    const server = http.createServer(nextApp.getRequestHandler()).listen(3000)

    const io = Server(server)
    // waiting connection in /todos name space
    const ioTodos = io.of('/todos')
    ioTodos.on('connection', socket => {
      console.log('connected')
      // broadcast to connected client list of todos
      socket.emit('todos', todos)

      // take care of the events from connected client
      socket
        // create new todo
        .on('createTodo', title => {
          if (typeof title !== 'string' || !title) {
            return
          }
          const todo = { id: id += 1, title, completed: false }
          todos.push(todo)
          ioTodos.emit('todos', todos)
        })
        // update todo's completed
        .on('updateCompleted', (id, completed) => {
          todos = todos.map(todo =>
            todo.id === id ? { ...todo, completed } : todo  
          )
          ioTodos.emit('todos', todos)
        })
        // delete todo
        .on('deleteTodo', id => {
          todos = todos.filter(todo => todo.id !== id)
          ioTodos.emit('todos', todos)
        })
    })
  },
  err => {
    console.error(err)
    process.exit(1)
  }
)