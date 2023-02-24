export interface TodoDto {
  todo: string
}

export interface UpdateTodoDto {
  todo: string | undefined
  isCompleted: boolean
}
