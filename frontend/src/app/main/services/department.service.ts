import { Department } from './../models/department';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  readonly url = 'http://localhost:3000/api/departments';

  private departmentsSubjects$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  // getDepartment(): Observable<Department[]> {
  //   if(!this.loaded) {
  //     this.http.get<Department[]>(`${this.url}/departments`)
  //     .pipe(tap((deps) => console.log(deps)))
  //     .subscribe(this.departmentsSubjects$);
  //     this.loaded = true;
  //   }
  //   return this.departmentsSubjects$.asObservable();
  // }

  getDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.url}`)
      .pipe(
        catchError((e) => {
          console.log(e);
          return throwError(e)
        })
      );
  }

  add(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.url}`, department);
  }

  update(dep: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.url}/${dep._id}`, dep);
  }

  del(dep: Department): Observable<any> {
    console.log(dep);
    return this.http.delete(`${this.url}/${dep._id}`);
  }
}
