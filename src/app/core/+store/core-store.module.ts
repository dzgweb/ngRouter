import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @Ngrx 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterStateSerializerProvider, routerReducers, RouterEffects } from './router';

@NgModule({
    imports: [
      CommonModule,
      StoreModule.forRoot(routerReducers),
      EffectsModule.forRoot([RouterEffects]),
      StoreRouterConnectingModule.forRoot(),
      // Instrumentation must be imported after importing StoreModule (config is optional) 
      !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [RouterStateSerializerProvider]
  })
  export class CoreStoreModule { }