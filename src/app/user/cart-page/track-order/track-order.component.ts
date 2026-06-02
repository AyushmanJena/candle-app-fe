import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DeliveryStatus, DeliveryStep, OrderDetailsResponse, OrderProducts } from '../../interface/TrackOrderDetails.interface';
import { TrackOrderApiService } from '../../services/track-order-api.service';
import { FormsModule } from '@angular/forms';
import { ProductsApiService } from '../../services/products-api.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent implements OnInit {

  userEnteredOrderId!: number;

  showPreviousOrderDetails: boolean = false;

  currentStatus!: DeliveryStatus;
  orderDetails!: OrderDetailsResponse;
  orderItems: OrderProducts[] = [];
  showError: boolean = false;

  readonly steps: DeliveryStep[] = [
    {
      key: 'PLACED',
      label: 'Order Placed',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    },
    {
      key: 'PENDING',
      label: 'Pending Confirmation',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      key: 'ACCEPTED',
      label: 'Order Accepted',
      icon: 'M5 13l4 4L19 7'
    },
    {
      key: 'SHIPPED',
      label: 'Shipped',
      icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
    },
    {
      key: 'DELIVERED',
      label: 'Delivered',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  get currentStepIndex(): number {
    return this.steps.findIndex(s => s.key === this.currentStatus);
  }

  isReached(i: number): boolean {
    return i <= this.currentStepIndex;
  }



  constructor(
    private router: Router,
    private trackOrderApiService: TrackOrderApiService,
    private productsApiService: ProductsApiService,
  ) { }

  ngOnInit() {
  }


  loadOrderDetails(orderId: number) {
    this.trackOrderApiService.getOrderDetailsById(orderId).subscribe({
      next: (data) => {
        this.showError = false;
        this.orderDetails = data;
        this.loadOrderItemsDetails();
        this.currentStatus = this.orderDetails.orderStatus;
        // console.log("Order details loaded: ", this.orderDetails);
      },
      error: (error) => {
        this.showPreviousOrderDetails = false;
        this.showError = true;
        console.error(error);
      }
    });
  }

  loadOrderItemsDetails() {
    const requests = this.orderDetails.items.map(item =>
      this.productsApiService.getProductById(item.productId)
    );
    console.log("---------------------------------------")

    forkJoin(requests).subscribe(products => {

      const orderProducts: OrderProducts[] = products.map((product, index) => ({
        productId: product.productId,
        title: product.title,
        imageUrl: product.imageUrl,
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice,
        quantity: this.orderDetails.items[index].quantity
      }));

      this.orderItems = orderProducts;
      
    });
  }

  trackOrder() {
    // call loadOrderDetails with userEnteredOrderId
    console.log("Tracking order with ID: ", this.userEnteredOrderId);
    this.loadOrderDetails(this.userEnteredOrderId);
    this.showPreviousOrderDetails = true;
  }

  redirectToProductDetailsPage(productId: number) {
    this.router.navigateByUrl('/product/'+productId);
  }

}

