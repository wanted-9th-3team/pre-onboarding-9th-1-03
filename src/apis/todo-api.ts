import {TodoDto, UpdateTodoDto} from "./dtos/TodoDto";
import { client } from "../utils/axios";


export function fetchTodos() {
    return client.get("/todos")
}

export function createTodo(todo: TodoDto) {
    return client.post("/todos", todo)
}

export function updateTodo(todoId: number, updateTodo: UpdateTodoDto) {
    return client.put(`/todos/${todoId}`, updateTodo)
}

export function deleteTodo(todoId: number) {
    return client.delete(`/todos/${todoId}`)
}