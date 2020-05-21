import { Person } from './../models/person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`)
      .pipe(
        catchError((e) => {
          console.log(e);
          return throwError(e)
        })
      );
  }
}
