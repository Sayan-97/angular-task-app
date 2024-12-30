import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap((action) =>
        this.taskService.addTask(action.task).pipe(
          map((task) => TaskActions.addTaskSuccess({ task })),
          catchError((error) => of(TaskActions.addTaskFailure({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id: action.id })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
