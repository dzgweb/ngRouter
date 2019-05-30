import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// rxjs
import { switchMap } from 'rxjs/operators';

import { TaskModel } from '../../models/task.model';
import { TaskArrayService, TaskPromiseService } from './../../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private taskArrayService: TaskArrayService,
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
        switchMap((params: Params) =>
          this.taskPromiseService.getTask(+params.get('taskID'))
        )
      )  //  switching of the flow parameters on the task flow
      .subscribe(
        task => this.task = {...task},
        err => console.log(err)
      );
  }

  onSaveTask() {
    const task = { ...this.task };

    if (task.id) {
      this.taskArrayService.updateTask(task);
    } else {
      this.taskArrayService.createTask(task);
    }
    
    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
