import { useState, useEffect } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/todos'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    fetch("http://localhost:3000/showtodos")
      .then(async (res) => {
        const data = await res.json()
        setTodos(data.allTodos)
      })
  }, [])

  return (
    <div>
      <CreateTodo onNewTodo={addTodo} />
      <Todos todos={todos} />
    </div>
  )
}

export default App

