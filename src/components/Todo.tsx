import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'

import {
  updateTodo,
  deleteTodo,
  createTodo,
  fetchTodos,
} from '../apis/todo-api'
import { useNavigate } from 'react-router-dom'

export interface Itodos {
  id: number
  todo: string
  isCompleted: boolean
}

function Todo() {
  const [todoInput, setTodoInput] = useState('')

  const navigate = useNavigate()

  const [todos, setTodos] = useState<Itodos[]>([])
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')

  useEffect(() => {
    if (!ACCESS_TOKEN) {
      navigate('/signin')
    } else {
      getTodos()
    }
  }, [])

  const getTodos = async () => {
    const response = await fetchTodos()
    setTodos(response.data)
  }

  const createTodoHandler = async (todo: string) => {
    const response = await createTodo({ todo })
    if (response.status === 201) {
      setTodoInput('')
      setTodos([response.data, ...todos])
    }
  }

  const updateTodosHandler = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    const response = await updateTodo(id, {
      todo,
      isCompleted,
    })

    setTodos([response.data, ...todos.filter(todo => todo.id !== id)])
  }

  const deleteTodoHandler = async (todoId: number) => {
    await deleteTodo(todoId)

    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  const logoutHandler = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('ACCESS_TOKEN')
      navigate('/signin')
    }
  }

  const todoItems = todos.map(item => (
    <TodoItem
      key={item.id}
      todo={item.todo}
      isCompleted={item.isCompleted}
      todoId={item.id}
      updateTodosHandler={updateTodosHandler}
      deleteTodoHandler={deleteTodoHandler}
    />
  ))

  return (
    <>
      <input
        type="text"
        data-testid="new-todo-input"
        placeholder="새 할일"
        value={todoInput}
        onChange={event => {
          setTodoInput(event.target.value)
        }}
      />
      <button
        data-testid="new-todo-add-button"
        onClick={() => {
          createTodoHandler(todoInput)
        }}
      >
        추가
      </button>
      {todoItems}
      <button onClick={logoutHandler}>로그아웃</button>
    </>
  )
}

export default Todo
