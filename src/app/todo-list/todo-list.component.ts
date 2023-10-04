import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoForm: FormGroup;
  showModal: boolean = false
  editMode: boolean = false
  todoList!: Todo[];

  constructor(private fb: FormBuilder, private todoService: TodoListService) {
    this.todoForm = this.fb.group({});
   }

  ngOnInit(): void {
    this.getTodoList();
    this.todoForm = this.fb.group({
      _id: [''],
      todoName: ['', Validators.required],
      todoDescription: ['', Validators.required],
    })
  }

  getTodoList() {
    this.todoService.getTodoList().subscribe((res: Todo[]) => {
      console.log(res)
      this.todoList = res
    })
  }

  onTodoSubmit() {
    if (this.editMode) {
      this.todoService.updateTodo(this.todoForm.value).subscribe(
        res => {
          this.getTodoList()
          this.onCloseModal()
        }, err => {
          console.log(err)
        }
      )
    }
    else {
      this.todoService.addTodo(this.todoForm.value).subscribe(
        res => {
          console.log(res)
          this.getTodoList()
          this.onCloseModal()
        }, err => {
          console.log(err)
        }
      )
    }
  }

  onAddTodo() {
    this.showModal = true;
    this.editMode=false;
    this.todoForm.reset();
  }

  onCloseModal() {
    this.showModal = false
  }

  onDeleteTodo(id: any) {
    if (confirm('Are you sure you want to delete the todo from the list?')) {
      this.todoService.deleteTodo(id).subscribe(
        res => {
          console.log(res)
          this.getTodoList()
        },
        err => {
          console.log(err)
        })
    }
  }
  onEditTodo(todo: Todo) {
    this.editMode = true
    this.showModal = true
    this.todoForm.patchValue(todo)
  }


  // todos: Todo[] = [];
  // newTodoText: string = '';

  // addTodo() {
  //   if (this.newTodoText.trim() === '') return;
    
  //   const newTodo: Todo = {
  //     id: Date.now(),
  //     text: this.newTodoText,
  //     completed: false
  //   };
    
  //   this.todos.push(newTodo);
  //   this.newTodoText = '';
  // }

  // toggleCompleted(todo: Todo) {
  //   todo.completed = !todo.completed;
  // }

  // deleteTodo(todo: Todo) {
  //   this.todos = this.todos.filter(t => t !== todo);
  // }
  
}
