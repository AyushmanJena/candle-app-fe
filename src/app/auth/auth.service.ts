import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginRequest } from '../admin/login/login.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = "http://localhost:8080/auth";

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post(
      `${this.baseUrl}/login`,
      loginRequest, 
      {withCredentials: true, responseType: 'text'}
    ).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  logout(){
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      {withCredentials: true, responseType: 'text'}
    ).pipe(
      tap(() => this.loggedIn.next(false))
    );
  }

  setLoggedIn(value: boolean){
    this.loggedIn.next(value);
  }

  isAuthenticated(){
    return this.loggedIn.value;
  }
}
