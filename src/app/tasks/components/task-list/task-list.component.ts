import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { TaskModel } from '../../models/task.model';

// rxjs
import { Observable } from 'rxjs';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/+store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.tasksState$ = this.store.pipe(select('tasks'));
    this.store.dispatch(new TasksActions.GetTasks());
  }

  onCompleteTask(task: TaskModel): void {
    this.store.dispatch(new TasksActions.DoneTask(task));
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }
}
