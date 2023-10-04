import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Todo } from '../todo.model'

@Injectable({
  providedIn: 'root'
})

export class TodoListService {
  url = 'http://localhost:3000/todoList'
  constructor(private http: HttpClient) { }
  addTodo(todo: Todo) {
    return this.http.post(this.url, todo)
  }

  getTodoList() {
    return this.http.get<Todo[]>(this.url)
  }

  deleteTodo(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }
  
  updateTodo(todo: Todo) {
    return this.http.put(`${this.url}/${todo._id}`, todo)
  }
}