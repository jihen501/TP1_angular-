import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { LoggerService } from '../../services/logger.service';
import { TodoStatus } from '../model/todoStatus';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos =signal<Todo[]>([]);
  constructor(private loggerService: LoggerService) { }

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.set([...this.todos(), todo]);
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo) : void {
    this.todos.set(this.todos().filter(t => t !== todo));
  }

  changeStatus(todo: Todo, status: TodoStatus): void {
    const index = this.todos().findIndex((t) => t === todo);
    this.todos()[index].status = status;
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos());
  }
}