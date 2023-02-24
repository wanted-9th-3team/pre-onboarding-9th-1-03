import { useTodos } from '../../hooks/useTodos'
import { useState } from 'react'
import { createTodo, deleteTodo, updateTodo } from '../../apis/todo-api'
import { UpdateTodoDto } from '../../apis/dtos/TodoDto'
import AddTodo from '../AddTodo'
import TodoList from './TodoList'

function ConnectTodos() {
  const { todos, setTodos } = useTodos()
  const [error, setError] = useState('')

  const handleCreateTodo = async (todoText: string) => {
    try {
      const createResponse = await createTodo({ todo: todoText })
      if (createResponse.status === 201) {
        setTodos([createResponse.data, ...todos])
      }
    } catch (e) {
      window.alert('서버통신 실패')
    }
  }

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const deleteResponse = await deleteTodo(todoId)
      if (deleteResponse.status === 204) {
        setTodos(todos.filter(todo => todo.id !== todoId))
      }
    } catch (e) {
      window.alert('서버통신 실패')
    }
  }

  const handleUpdate = async (todoId: number, todo: UpdateTodoDto) => {
    try {
      const updateResponse = await updateTodo(todoId, todo)
      if (updateResponse.status === 200) {
        setTodos([
          updateResponse.data,
          ...todos.filter(todo => todo.id !== todoId),
        ])
      }
    } catch (e) {
      window.alert('서버통신 실패')
    }
  }

  return (
    <div>
      <AddTodo addTodo={handleCreateTodo} />
      <TodoList
        createTodo={handleCreateTodo}
        deleteTodo={handleDeleteTodo}
        updateTodo={handleUpdate}
        todos={todos}
      />
    </div>
  )
}

export default ConnectTodos
