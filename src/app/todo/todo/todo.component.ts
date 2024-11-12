import { Component, inject, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { FormsModule } from '@angular/forms';

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
  addTodo(nameInput: HTMLInputElement, contentInput: HTMLInputElement) {
    console.log('addTodo');
    console.log(this.todo()); 
    this.todoService.addTodo(this.todo());
    this.i++;
    this.todo.set(new Todo(this.i));
    this.todoService.logTodos()
    this.todos.set(this.todoService.getTodos());
    nameInput.value = '';
    contentInput.value = '';
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    this.todos.set(this.todoService.getTodos());
    this.todoService.logTodos();
  }

  setTodoName(name: string) {
    this.todo.set({ ...this.todo(), name: name });
  }

  setTodoContent(content: string) {
    this.todo.set({ ...this.todo(), content: content });
  }
}
