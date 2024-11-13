import { Component, inject, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { FormsModule } from '@angular/forms';
import { TodoStatus } from '../model/todoStatus';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [FormsModule],
})

export class TodoComponent {
  private todoService = inject(TodoService);
  i = 0; 
  todos = signal<Todo[]>([]);
  todo = signal(new Todo(this.i));
  constructor() {
    this.todos.set(this.todoService.getTodos());
  }
  addTodo() {
    this.todoService.addTodo(this.todo());
    this.i++;
    this.todo.set(new Todo(this.i));
    this.todoService.logTodos()
    this.todos.set(this.todoService.getTodos());

  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    this.todos.set(this.todoService.getTodos());
  }
  
  changeStatus(todo: Todo , status :TodoStatus) {
    this.todoService.changeStatus(todo,status);
    this.todos.set(this.todoService.getTodos());
  
  }
}
