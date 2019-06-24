import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, delay, finalize, catchError, tap, take } from 'rxjs/operators';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, getSelectedUserByUrl } from './../../core/+store';
import * as UsersActions from './../../core/+store/users/users.actions';

import { UserModel } from './../models/user.model';
import { UsersServicesModule } from '../users-services.module';
import { SpinnerService } from './../../core';

@Injectable({
  providedIn: UsersServicesModule
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private store: Store<AppState>,
  ) {}

   resolve(): Observable<UserModel> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
      select(getSelectedUserByUrl),
      tap(user => this.store.dispatch(new UsersActions.SetOriginalUser(user))),
      delay(2000),
      map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
