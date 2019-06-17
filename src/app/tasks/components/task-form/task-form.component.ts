import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// rxjs
import { switchMap } from 'rxjs/operators';

import { TaskModel } from '../../models/task.model';
import { TaskPromiseService } from './../../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();

    // this.route.paramMap.subscribe(params => {
    //   const id = +params.get('taskID');
    //   this.taskArrayService.getTask(id).then(task => this.task = {...task});
    //   console.log(id);
    // });

    // const id = this.route.snapshot.paramMap.get('taskID');
    // this.taskArrayService.getTask(id).then(task => this.task = task);

    // it is not necessary to save subscription to route.paramMap
    // it handles automatically
    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          return params.get('taskID')
            ? this.taskPromiseService.getTask(+params.get('taskID'))
            // when Promise.resolve(null) => task = null => {...null} => {}
            : Promise.resolve(null);
        })  
      )  //  switching of the flow parameters on the task flow
      .subscribe(
        task => this.task = {...task},
        err => console.log(err)
      );
  }

  onSaveTask() {
    const task = { ...this.task };

    // if (task.id) {
    //   this.taskPromiseService.updateTask(task).then( () => this.onGoBack() );
    // } else {
    //   this.taskArrayService.createTask(task);
    //   this.onGoBack();
    // }
    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));

  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
