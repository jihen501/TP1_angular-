import { TodoStatus } from "./todoStatus";

export class Todo {
  constructor(public id:number,public name = '', public content = '', public status : TodoStatus= 'waiting') {}
}
