import React from 'react'
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

  // todoId: number, updateTodo: UpdateTodoDto)

  //   <input
  //   type="checkbox"
  //   defaultChecked={item.isCompleted ? "checked" : ""}
  //   onChange={(e) =>
  //     updateTodosHandler(item.id, item.todo, e.target.checked)
  //   }
  // />

  return (
    <div>
      <li>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={ev => {
            updateTodosHandler(todoId, todo, ev.target.checked)
          }}
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
            <button
              data-testid="delete-button"
              onClick={() => {
                deleteTodoHandler(todoId)
              }}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <input
              data-testid="modify-input"
              defaultValue={editInput}
              onChange={ev => {
                setEditInput(ev.target.value)
              }}
            />
            <button
              data-testid="submit-button"
              onClick={() => {
                updateTodosHandler(todoId, editInput, isCompleted)
                setEditMode(!editMode)
              }}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => {
                setEditMode(!editMode)
                setEditInput(todo)
              }}
            >
              취소
            </button>
          </>
        )}
      </li>
    </div>
  )
}

export default TodoItem
