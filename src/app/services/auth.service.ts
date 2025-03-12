import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   getUserFromStorage(): any {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
    users:User[]=[]
  constructor(private http: HttpClient) {}

  register(userData: User): Observable<any> {
    return this.http.post<User>(`http://localhost:3000/api/auth/register`, userData).pipe(
      tap((response) => {
        this.users.push(userData); 
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  login(userData:{email:string|null,password:string|null}): Observable<any> {
    return this.http.post<User>(`http://localhost:3000/api/auth/login `, userData).pipe(
      tap((response) => {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  
  
}
