import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getUsersOriginalUser } from './../../../core/+store';
import * as UsersActions from './../../../core/+store/users/users.actions';

import { UserModel } from './../../models/user.model';
import { DialogService, CanComponentDeactivate } from './../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('user')).subscribe((user: UserModel) => {
      this.user = { ...user };
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // const flags = Object.keys(this.originalUser).map(key => {
    //   if (this.originalUser[key] === this.user[key]) {
    //     return true;
    //   }
    //   return false;
    // });

    // if (flags.every(el => el)) {
    //   return true;
    // }
    
    // return this.dialogService.confirm('Discard changes?');

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

    // const method = user.id ? 'updateUser' : 'createUser';
    // this.sub = this.userObservableService[method](user)
    //   .subscribe(
    //     savedUser => {
    //       this.originalUser = { ...savedUser };
    //       user.id
    //         // optional parameter: http://localhost:4200/users;editedUserID=2
    //         ? this.router.navigate(['users', { editedUserID: user.id }])
    //         : this.onGoBack();
    //     },
    //     error => console.log(error)
    //   );

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }
  }

  onGoBack() {
    // this.router.navigate(['./../../'], { relativeTo: this.route});
    this.location.back();
  }

}
