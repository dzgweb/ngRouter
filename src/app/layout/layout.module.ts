import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent, HomeComponent, PathNotFoundComponent } from './components';

@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    PathNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
