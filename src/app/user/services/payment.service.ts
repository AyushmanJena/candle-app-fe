import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/payment';

  constructor(private http: HttpClient) {}

  createRazorpayOrder(amount: number): Observable<{ orderId: string }> {
    return this.http.post<{ orderId: string }>(`${this.baseUrl}/create-order`, { amount });
  }

  verifyAndSave(payload: any): Observable<{ orderId: number, status: string }> {
    return this.http.post<{ orderId: number, status: string }>(`${this.baseUrl}/verify-and-save`, payload);
  }
}