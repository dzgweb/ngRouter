import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';
import { DialogService, CanComponentDeactivate } from './../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: UserModel;
  originalUser: UserModel;

  private sub: Subscription;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new UserModel(null, '', '');

    // we should recreate component because this code runs only once
    const id = +this.route.snapshot.paramMap.get('userID');
    this.sub = this.userArrayService.getUser(id)
      .subscribe(
        user => {
          this.user = {...user};
          this.originalUser = {...user};
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
