import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import {
  updateTodo,
  deleteTodo,
  createTodo,
  fetchTodos,
} from '../apis/todo-api'
import { AxiosError } from 'axios'
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
    try {
      const response = await fetchTodos()
      setTodos(response.data)
    } catch (err) {
      throw new Error()
    }
  }

  const createTodoHandler = async (todo: string) => {
    try {
      const response = await createTodo({ todo })
      setTodos([...todos, response.data])
      response.status === 201 && setTodoInput('')
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error()
      }
    }
  }

  const updateTodosHandler = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    try {
      const response = await updateTodo(id, {
        todo,
        isCompleted,
      })

      setTodos([response.data, ...todos.filter(todo => todo.id !== id)])
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error()
      }
    }
  }

  const deleteTodoHandler = async (todoId: number) => {
    try {
      await deleteTodo(todoId)

      setTodos(todos.filter(todo => todo.id !== todoId))
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error()
      }
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
        onChange={ev => {
          setTodoInput(ev.target.value)
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
    </>
  )
}

export default Todo
