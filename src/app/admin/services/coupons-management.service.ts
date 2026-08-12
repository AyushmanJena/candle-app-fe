import { Injectable } from '@angular/core';
import { CouponRequest, CouponsList } from '../interfaces/coupons.interface';
import { Observable } from 'rxjs';
import { MockAdminApiService } from '../../mock/mock-admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsManagementService {

  constructor(
    private mockAdminApiService: MockAdminApiService,
  ) { }
  getAllCoupons(): Observable<CouponsList[]> {
    return this.mockAdminApiService.getAllCoupons();
  }

  createCoupon(formValue: any): Observable<CouponsList> {
    return this.mockAdminApiService.createCoupon(formValue);
  }

  changeCouponStatus(couponId: number): Observable<CouponsList> {
    return this.mockAdminApiService.changeCouponStatus(couponId);
  }
}
