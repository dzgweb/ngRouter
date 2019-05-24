import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UsersServicesModule
  ]
})
export class UsersModule { }
