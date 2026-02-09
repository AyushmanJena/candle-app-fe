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
  email = "";
  password = "";
  errorMsg = "";

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/admin']);
      },
      error: () => this.errorMsg = "Invalid email or password"
    });
  }
}
