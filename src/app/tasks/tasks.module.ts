import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksServicesModule } from './tasks-services.module';
import { TaskListComponent, TaskComponent, TaskFormComponent } from './components';

// ngrx
import { StoreModule } from '@ngrx/store';
import { TasksEffects, tasksReducer } from './../core/+store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [TaskListComponent, TaskComponent, TaskFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('tasks', tasksReducer),
    TasksRoutingModule,
    TasksServicesModule,
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksModule { }
