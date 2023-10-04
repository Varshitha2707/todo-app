import { Component } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTodoText: string = '';

  addTodo() {
    if (this.newTodoText.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: this.newTodoText,
      completed: false
    };
    
    this.todos.push(newTodo);
    this.newTodoText = '';
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t !== todo);
  }
  
}
