import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutoUnsubscribe } from './../../../core/decorators';
import { UserModel } from './../../models/user.model';

// rxjs
import { Observable, Subscription} from 'rxjs';

//ngrx
import { Store, select } from '@ngrx/store';
import * as UsersActions from './../../../core/+store/users/users.actions';
import { AppState, getUsers, getUsersError, getEditedUser } from './../../../core/+store';


@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>;
  usersError$: Observable<Error | string>;

  private subscription: Subscription;
  private editedUser: UserModel;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  // ngOnInit() {
  //   this.users$ = this.userObservableService.getUsers();

  //   this.route.paramMap
  //     .pipe(
  //       switchMap((params: Params) => {
  //         return params.get('editedUserID')
  //           ? this.userObservableService.getUser(+params.get('editedUserID'))
  //           : of(null);
  //       })      
  //     )
  //     .subscribe(
  //       (user: UserModel) => {
  //         this.editedUser = {...user};
  //         console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
  //       },
  //       err => console.log(err)
  //     );

  // }

  ngOnInit() {
    this.users$ = this.store.pipe(select(getUsers));
    this.usersError$ = this.store.pipe(select(getUsersError));
    this.store.dispatch(new UsersActions.GetUsers());

    // listen editedUserID from UserFormComponent
    this.subscription = this.store.pipe(select(getEditedUser))
    .subscribe(
      user => {
        this.editedUser = user;
        console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
      },
      err => console.log(err)
    );
  }


  onEditUser(user: UserModel) {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
  }

  onDeleteUser(user: UserModel) {
    this.store.dispatch(new UsersActions.DeleteUser(user));
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

}
