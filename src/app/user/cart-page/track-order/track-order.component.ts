import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DeliveryStatus, DeliveryStep, OrderDetails } from '../../interface/TrackOrderDetails.interface';
import { TrackOrderApiService } from '../../services/track-order-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent implements OnInit {

  userEnteredOrderId! : number;

  showPreviousOrderDetails: boolean = false;

  currentStatus!: DeliveryStatus;
 
  readonly steps: DeliveryStep[] = [
    { key: 'order_placed', label: 'Order Placed', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { key: 'processing', label: 'Processing', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { key: 'shipped', label: 'Shipped', icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { key: 'delivered', label: 'Delivered', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];
 
  get currentStepIndex(): number {
    return this.steps.findIndex(s => s.key === this.currentStatus);
  }
 
  isReached(i: number): boolean {
    return i <= this.currentStepIndex;
  }

  orderDetails!: OrderDetails;
  showError: boolean = false;

  constructor(
    private trackOrderApiService: TrackOrderApiService,
  ){}

  ngOnInit(){
  }
  

  loadOrderDetails(orderId: number){
    this.trackOrderApiService.getOrderDetailsById(orderId).subscribe({
      next: (data) => {
        this.showError = false;
        this.orderDetails = data;
        this.currentStatus = this.orderDetails.orderStatus;
      },
      error : (error) => {
        this.showPreviousOrderDetails = false;
        this.showError = true;
        console.error(error);
      }
    });
  }

  trackOrder(){
    // call loadOrderDetails with userEnteredOrderId
    console.log("Tracking order with ID: ", this.userEnteredOrderId);
    this.loadOrderDetails(this.userEnteredOrderId);
    this.showPreviousOrderDetails = true;
  }
}

