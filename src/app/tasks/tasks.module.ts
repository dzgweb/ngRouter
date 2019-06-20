import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksServicesModule } from './tasks-services.module';
import { TaskListComponent, TaskComponent, TaskFormComponent } from './components';

// ngrx
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './../core/+store';


@NgModule({
  declarations: [TaskListComponent, TaskComponent, TaskFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('tasks', tasksReducer),
    TasksRoutingModule,
    TasksServicesModule
  ]
})
export class TasksModule { }
