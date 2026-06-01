import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CouponRequest, CouponsList } from '../interfaces/coupons.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsManagementService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080/";

  getAllCoupons(): Observable<CouponsList[]> {
    return this.http.get<CouponsList[]>(this.baseUrl + 'admin/coupon');
  }

  createCoupon(formValue: any){
    const request: CouponRequest = {
      couponCode: formValue.couponCode,
      discountPercentage: formValue.discountPercentage,
      minimumPurchase: formValue.minimumPurchase,
      activeStatus: true, // by default the coupon will be active when created
    };
  
    return this.http.post(this.baseUrl + 'admin/coupon', request);
  }

  changeCouponStatus(couponId: number){
    console.log("toggled ", couponId);
    return this.http.put(this.baseUrl + 'admin/coupon/toggle-status/' + couponId, null);

  }
}
