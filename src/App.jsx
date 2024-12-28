import { useState, useEffect } from 'react'
import './App.css'
import {CreateTodo} from './components/CreateTodo'
import { Todos } from './components/todos'

function App() {
  console.log("App started")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    console.log("useEffect started")
    fetch("http://localhost:3000/showtodos")
    .then(async (res)=>{
      console.log("fetching todos")
      const data = await res.json()
      console.log("fetched data", data)
      setTodos(data.allTodos)
    })
  }, [])

  console.log("rendering")
  return (
    <div>
      <CreateTodo/> 
      <Todos todos={todos}/>
    </div>
  )
}

export default App












