import { useEffect, useState } from "react"
import Link from 'next/link'
import Head from 'next/head'
import io from 'socket.io-client'

// define informations concerned each pages
const pages = {
  index: { title: 'All Todos' },
  active: { title: 'Undone Todos', completed: false },
  completed: { title: 'Done Todos', completed: true },
}

// links to switch pages using CSR
const pageLinks = Object.keys(pages).map((page, index) => 
  <Link href={`/${page === 'index' ? '' : page}`} key={index}>
    <a style={{ marginRight: 10 }}>{pages[page].title}</a>
  </Link>
)

export default function Todos(props) {
  const { title, completed } = pages[props.page]
  const [todos, setTodos] = useState([])

  // socketをstateとして保持
  const [socket, setSocket] = useState()

  useEffect(() => {
    // create socket
    const socket = io('/todos')
    socket.on('todos', todos => {
      // store todos in state
      setTodos(
        typeof completed === 'undefined'
          ? todos
          : todos.filter(todo => todo.completed === completed)
      )
    })
    // store socket in state
    setSocket(socket)
    // close socket when cleaning up component
    return () => socket.close()
  }, [props.page])

  // JSX
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <label>
        Input New Todo
        <input onKeyPress={e => {
          // register todo when enter key is pressed
          const title = e.target.value
          if (e.key !== 'Enter' || !title) {
            return
          }
          e.target.value = ''
          socket.emit('createTodo', title)
        }} />
      </label>
      {/* List of Todo */}
      <ul>
        {todos.map(({ id, title, completed}) =>
          <li key={id}>
            <label style={completed ? { textDecoration: 'line-through' } : {}}>
              <input
                type="checkbox"
                checked={completed}
                onChange={e =>
                  socket.emit('updateCompleted', id, e.target.checked)
                }
              />
              {title}
            </label>
            <button onClick={() => socket.emit('deleteTodo', id)}>Delete</button>
          </li>
        )}
      </ul>
      <div>{pageLinks}</div>
    </>
  )
}