import { useState } from 'react'

interface IAddTodoProps {
  addTodo: (todo: string) => void
}

export function AddTodo({ addTodo }: IAddTodoProps) {
  const [todo, setTodo] = useState('')

  const handleAddTodo = () => {
    addTodo(todo)
    setTodo('')
  }

  return (
    <>
      <input
        value={todo}
        onChange={e => {
          setTodo(e.target.value)
        }}
      />
      <button onClick={handleAddTodo}>추가</button>
    </>
  )
}

export default AddTodo
