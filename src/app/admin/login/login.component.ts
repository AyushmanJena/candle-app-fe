import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  username = '';
  password = '';
  errorMessage = '';

  login(){
    this.errorMessage = '';
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },

      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}

export interface LoginRequest{
  username: string;
  password: string;
}
