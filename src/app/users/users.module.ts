import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UsersServicesModule } from './users-services.module';
import { UsersRoutingModule, usersRouterComponents } from './users-routing.module';
import { UserComponent } from './components';
import { UsersAPIProvider } from './users.config';


@NgModule({
  declarations: [
    usersRouterComponents,
    UserComponent,
],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UsersServicesModule
  ],
  providers: [
    UsersAPIProvider
  ]
})
export class UsersModule { }
