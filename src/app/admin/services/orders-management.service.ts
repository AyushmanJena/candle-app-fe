import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersList } from '../dashboard/admin-orders/admin-orders.component';
import { OrderDetails } from '../../user/interface/TrackOrderDetails.interface';
import { OrderDetailsResponse } from '../interfaces/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersManagementService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080/";

  getAllOrders(){
    return this.http.get<OrdersList[]>(this.baseUrl + 'admin/orders');
  }

  getOrderDetailsById(orderId: number){
    return this.http.get<OrderDetailsResponse>(this.baseUrl + 'orders/' + orderId);
  }

  changeOrderStatus(orderId: number, newStatus: string){
    const params = new HttpParams().set('status', newStatus);
    return this.http.patch(this.baseUrl + 'admin/orders/' + orderId + '/status', null, {params});
  }
}
