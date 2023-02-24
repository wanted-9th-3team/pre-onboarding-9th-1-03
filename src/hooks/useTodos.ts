import { Todo } from '../types'
import { useEffect, useState } from 'react'
import { fetchTodos } from '../apis/todo-api'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    const loadTodos = async () => {
      const response = await fetchTodos()
      if (response.status === 200) {
        setTodos([...response.data])
      }
    }
    loadTodos()
    setLoading(false)
  }, [])

  return { todos, setTodos, loading, error }
}
