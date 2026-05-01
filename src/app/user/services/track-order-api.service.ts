import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../interface/TrackOrderDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class TrackOrderApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080/";

  getOrderDetailsById(orderId: number){
    return this.http.get<OrderDetails>(this.baseUrl + 'track-order/' + orderId);
  }
}
