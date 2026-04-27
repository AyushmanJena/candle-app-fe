import { Component } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthService,private router: Router) {}

  logout() {
    this.auth.logout();
    window.location.href = "/login";
  }

  adminDashboardHome(){
    this.router.navigateByUrl('/admin');
  }

  adminOrders(){
    this.router.navigateByUrl('/admin/orders');
  }

  adminCoupons(){
    this.router.navigateByUrl('/admin/coupons');
  }

  adminProducts(){
    this.router.navigateByUrl('/admin/products');
  }
}
