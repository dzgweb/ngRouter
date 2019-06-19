import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { UserModel } from './../../models/user.model';
import { UserObservableService } from './../../services';
import { Location } from '@angular/common';
import { AutoUnsubscribe, DialogService, CanComponentDeactivate } from './../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;
  originalUser: UserModel;

  private sub: Subscription;  // if private sub1: Subscription;  -> @AutoUnsubscribe(sub1)

  constructor(
    private userObservableService: UserObservableService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('user')).subscribe((user: UserModel) => {
      this.user = { ...user };
      this.originalUser = { ...user };
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = Object.keys(this.originalUser).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }
    
    return this.dialogService.confirm('Discard changes?');
  }


  onSaveUser() {
    const user = {...this.user};

    // if (user.id) {
    //   this.userObservableService.updateUser(user);
    //   this.router.navigate(['/users', {editedUserID: user.id}]);  // data of a user was edited
    // } else {
    //   this.userObservableService.createUser(user);
    //   this.onGoBack();
    // }
    // this.originalUser = {...this.user};

    const method = user.id ? 'updateUser' : 'createUser';
    this.sub = this.userObservableService[method](user)
      .subscribe(
        savedUser => {
          this.originalUser = { ...savedUser };
          user.id
            // optional parameter: http://localhost:4200/users;editedUserID=2
            ? this.router.navigate(['users', { editedUserID: user.id }])
            : this.onGoBack();
        },
        error => console.log(error)
      );

  }

  onGoBack() {
    // this.router.navigate(['./../../'], { relativeTo: this.route});
    this.location.back();
  }

}
