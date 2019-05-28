import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';
import { DialogService, CanComponentDeactivate } from './../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;
  originalUser: UserModel;

  constructor(
    private userArrayService: UserArrayService,
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

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate(['/users', {editedUserID: user.id}]);  // data of a user was edited
    } else {
      this.userArrayService.createUser(user);
      this.onGoBack();
    }
    this.originalUser = {...this.user};
  }

  onGoBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});
  }
}
