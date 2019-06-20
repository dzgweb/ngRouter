import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { TaskModel } from '../../models/task.model';
import { TaskPromiseService } from '../../services';

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
  tasks: Promise<Array<TaskModel>>;
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router,
    private taskPromiseService: TaskPromiseService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // this.tasks = this.taskPromiseService.getTasks();
    // ngrx store
    this.tasksState$ = this.store.pipe(select('tasks'));
  }

  onCompleteTask(task: TaskModel): void {
    // const updatedTask = { ...task, done: true };
    // this.taskArrayService.updateTask(updatedTask);

    // this.updateTask(task).catch(err => console.log(err));
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
    this.taskPromiseService
      .deleteTask(task)
      .then(() => (this.tasks = this.taskPromiseService.getTasks()))
      .catch(err => console.log(err));
  }

  // private async updateTask(task: TaskModel) {
  //   const updatedTask = await this.taskPromiseService.updateTask({
  //     ...task,
  //     done: true
  //   });

  //   const tasks: TaskModel[] = await this.tasks;
  //   const index = tasks.findIndex(t => t.id === updatedTask.id);
  //   tasks[index] = { ...updatedTask };
  // }

}
