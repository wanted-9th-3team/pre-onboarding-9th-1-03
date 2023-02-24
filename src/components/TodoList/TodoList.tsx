import React, { useEffect, useRef, useState } from 'react'
import { UpdateTodoDto } from '../../apis/dtos/TodoDto'
import { Todo } from '../../types'
import { useNavigate } from 'react-router-dom'

interface ITodosProps {
  createTodo: (todoText: string) => void
  updateTodo: (todoId: number, todo: UpdateTodoDto) => void
  deleteTodo: (todoId: number) => void
  todos: Todo[]
}

function TodoList({ todos, createTodo, updateTodo, deleteTodo }: ITodosProps) {
  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState(true)
  const textRef = useRef<HTMLInputElement | null>(null)
  const [text, setText] = useState('')
  const handleComplete = (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    updateTodo(todo.id, { isCompleted: e.target.checked, todo: todo.todo })
  }

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN') === null) {
      navigate('/signin')
    }
  }, [localStorage.getItem('ACCESS_TOKEN')])

  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {todos
          .sort((a, b) => {
            if (a.isCompleted) {
              return 1
            } else if (b.isCompleted) {
              return -1
            } else {
              return 0
            }
          })
          .map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                name="complete"
                checked={todo.isCompleted}
                onChange={e => {
                  handleComplete(e, todo)
                }}
              />
              <input
                type="text"
                disabled={isUpdate}
                ref={textRef}
                defaultValue={todo.todo}
                onChange={e => {
                  setText(e.target.value)
                }}
              />
              <button
                type="button"
                onClick={() => {
                  deleteTodo(todo.id)
                }}
              >
                삭제
              </button>
              <button
                type="button"
                onClick={() => {
                  isUpdate
                    ? setIsUpdate(!isUpdate)
                    : updateTodo(todo.id, {
                        isCompleted: todo.isCompleted,
                        todo: text,
                      })
                  setIsUpdate(!isUpdate)
                }}
              >
                {isUpdate ? '수정' : '확인'}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TodoList
