import React, { ChangeEvent } from 'react'
import { useState } from 'react'

interface ITodoItemProps {
  todo: string
  todoId: number
  isCompleted: boolean
  updateTodosHandler: (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => Promise<void>
  deleteTodoHandler: (id: number) => Promise<void>
}

function TodoItem({
  todo,
  todoId,
  isCompleted,
  updateTodosHandler,
  deleteTodoHandler,
}: ITodoItemProps) {
  const [editMode, setEditMode] = useState(true)
  const [editInput, setEditInput] = useState(todo)

  const updateTodoButton = (event: ChangeEvent<HTMLInputElement>) => {
    const isCompleted = event.target.checked
    updateTodosHandler(todoId, todo, isCompleted)
  }

  const submitTodoButton = () => {
    if (confirm('진짜 수정하겠습니까?')) {
      updateTodosHandler(todoId, editInput, isCompleted)
      setEditMode(!editMode)
    }
  }

  const cancelButtonHandler = () => {
    setEditMode(!editMode)
    setEditInput(todo)
  }

  const deleteButtonHandelr = () => {
    if (confirm('진짜 삭제하시겠습니까??')) deleteTodoHandler(todoId)
  }

  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={updateTodoButton}
        />
        {editMode ? (
          <>
            <span
              className="form-control"
              style={{ border: '1px solid white' }}
            >
              {todo}
            </span>

            <button
              data-testid="modify-button"
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              수정
            </button>
            <button data-testid="delete-button" onClick={deleteButtonHandelr}>
              삭제
            </button>
          </>
        ) : (
          <>
            <input
              data-testid="modify-input"
              defaultValue={editInput}
              onChange={event => {
                setEditInput(event.target.value)
              }}
            />
            <button data-testid="submit-button" onClick={submitTodoButton}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={cancelButtonHandler}>
              취소
            </button>
          </>
        )}
      </li>
    </div>
  )
}

export default TodoItem
