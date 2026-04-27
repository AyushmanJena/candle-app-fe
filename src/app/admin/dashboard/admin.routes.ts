import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminCouponsComponent} from './admin-coupons/admin-coupons.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'coupons', component: AdminCouponsComponent },
      { path: 'orders', component: AdminOrdersComponent }
    ]
  }
];
