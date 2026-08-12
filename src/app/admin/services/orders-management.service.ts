import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsResponse, OrdersList } from '../interfaces/orders.interface';
import { DeliveryStatus } from '../../user/interface/TrackOrderDetails.interface';
import { MockAdminApiService } from '../../mock/mock-admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersManagementService {

  constructor(
    private mockAdminApiService: MockAdminApiService,
  ) { }

  getAllOrders(): Observable<OrdersList[]> {
    return this.mockAdminApiService.getAllOrders();
  }

  getOrderDetailsById(orderId: number): Observable<OrderDetailsResponse> {
    return this.mockAdminApiService.getOrderDetailsById(orderId);
  }

  changeOrderStatus(orderId: number, newStatus: DeliveryStatus): Observable<OrderDetailsResponse> {
    return this.mockAdminApiService.changeOrderStatus(orderId, newStatus);
  }
}
