import { useEffect, useState } from "react";
import Link from 'next/link'
import Head from 'next/head'
import 'isomorphic-fetch'

// define information located on each page
const pages = {
  index: { title: 'Add Todos', fetchQuery: '' },
  active: { title: 'Undone Todos', fetchQuery: '?completed=false' },
  completed: { title: 'Done Todos', fetchQuery: '?completed=true' }
}

// links to switch pages using CSR
const pageLinks = Object.keys(pages).map((page, index) => 
  <Link href={`/${page === 'index' ? '' : page}`} key={index}>
    <a style={{ marginRight: 10 }}>{pages[page].title}</a>
  </Link>
)

// implement react component and publish
export default function Todos(props) {
  console.log(props.page)
  const { title, fetchQuery } = pages[props.page]

  // initialize component and update depending on props values
  const [todos, setTodos] = useState([])
  useEffect(() => {
    fetch(`api/todos${fetchQuery}`)
      .then(async res => res.ok
        ? setTodos(await res.json())
        : alert(await res.text())
      )
  }, [props.page])

  // drow JSX
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <ul>
        {todos.map(({ id, title, completed }) => 
          <li key={id}>
            <span style={completed ? { textDecoration: 'line-through' } : {}}>
              {title}
            </span>
          </li>
        )}
      </ul>
      <div>{pageLinks}</div>
    </>
  )

}
