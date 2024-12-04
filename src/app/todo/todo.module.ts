import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';


const routes: Route[] = [
  { path: "", component: TodoComponent },
];
@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class TodoModule { }
