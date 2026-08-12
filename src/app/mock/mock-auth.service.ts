import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { LoginRequest } from '../admin/login/login.component';
import { MOCK_DB } from './mock-database';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  private readonly API_DELAY = 300;


  login(loginRequest: LoginRequest) {

    const isValid =
      loginRequest.username === MOCK_DB.adminUser.username &&
      loginRequest.password === MOCK_DB.adminUser.password;

    if (!isValid) {
      return throwError(
        () => new Error('Invalid username or password')
      );
    }

    return of('Login successful').pipe(
      delay(this.API_DELAY),
      tap(() => {
        this.loggedIn.next(true);
      })
    );
  }


  logout() {

    return of('Logout successful').pipe(
      delay(this.API_DELAY),
      tap(() => {
        this.loggedIn.next(false);
      })
    );
  }


  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }


  isAuthenticated() {
    return this.loggedIn.value;
  }
}