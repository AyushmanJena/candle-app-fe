import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loginApi = "http://localhost:8080/auth/login";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.loginApi, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem("token");
  }
}
