import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://677106cf2ffbd37a63ce033c.mockapi.io/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl).pipe(
      map((tasks) => tasks.sort((a, b) => b.id - a.id)),
      catchError(this.handleError<Task[]>('getTasks'))
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient
      .post<Task>(this.apiUrl, task)
      .pipe(catchError(this.handleError<Task>('addTask')));
  }

  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.httpClient
      .delete<void>(url)
      .pipe(catchError(this.handleError<void>('deleteTask')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
