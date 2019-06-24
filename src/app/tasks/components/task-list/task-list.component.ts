import { Component, OnInit } from '@angular/core';

import { TaskModel } from '../../models/task.model';

// rxjs
import { Observable } from 'rxjs';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getTasksData, getTasksError} from './../../../core/+store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';
import * as RouterActions from './../../../core/+store/router/router.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<TaskModel>>;
  tasksError$: Observable<Error | string>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(getTasksData));
    this.tasksError$ = this.store.pipe(select(getTasksError));

    this.store.dispatch(new TasksActions.GetTasks());
  }

  onCompleteTask(task: TaskModel): void {
    const doneTask = {...task, done: true};
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));
  }

  onCreateTask() {
    const link = ['/add'];
    this.store.dispatch(new RouterActions.Go({
      path: ['/add']
    }));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.store.dispatch(new RouterActions.Go({
      path: link
    }));
  }

  onDeleteTask(task: TaskModel) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }
}
