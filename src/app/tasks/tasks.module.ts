import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksServicesModule } from './tasks-services.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    TasksServicesModule
  ]
})
export class TasksModule { }
