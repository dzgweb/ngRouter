import { Component, OnInit } from '@angular/core';

// rxjs
import { Observable, of, Subscription } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getUsersOriginalUser, getSelectedUserByUrl } from './../../../core/+store';
import * as UsersActions from './../../../core/+store/users/users.actions';
import * as RouterActions from './../../../core/+store/router/router.actions';

import { UserModel } from './../../models/user.model';
import { AutoUnsubscribe, DialogService, CanComponentDeactivate } from './../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;
  private sub: Subscription;

  constructor(
    private dialogService: DialogService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store
      .pipe(select(getSelectedUserByUrl))
      .subscribe(user => this.user = user);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];

    return this.store.pipe(
      select(getUsersOriginalUser),
      switchMap(originalUser => {
        for (const key in originalUser) {
          if (originalUser[key] === this.user[key]) {
            flags.push(true);
          } else {
            flags.push(false);
          }
        }

        if (flags.every(el => el)) {
          return of(true);
        }

        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
      })
    );
  }

  onSaveUser() {
    const user = {...this.user};

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }
  }

  onGoBack() {
    this.store.dispatch(new RouterActions.Back());
  }

}
