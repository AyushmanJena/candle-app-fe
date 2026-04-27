import { Component, OnInit } from '@angular/core';
import { CartProductCardComponent } from './cart-product-card/cart-product-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../shared/services/cart-service.service';
import { ProductsApiService } from '../services/products-api.service';
import { ProductCardData } from '../../products.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  imports: [
    CartProductCardComponent,
    CommonModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  constructor(
    private router: Router,
    private cartService: CartService,
    private productApiService: ProductsApiService,
  ) {
  }

  ngOnInit(): void {
    this.applyCoupon();
    this.fetchCartItems();
  }

  subTotal: number = 0;
  deliveryCharge: number = 0;
  grandTotal: number = 0;
  couponApplied: boolean = true;
  coupon: Coupon = {
    couponCode: '',
    couponType: '',
    couponValue: 0,
    discountAmount: 0
  };

  storedCartItems: CartItem[] = []; // to store items from local storage
  cartItems: ProductCardData[] = []; //  data fetched using api 
  cartProducts: CartProduct[] = []; // to store final data and also store quantity

  fetchCartItems() {
    this.storedCartItems = this.cartService.getCartItems();

    const requests = this.storedCartItems.map(item =>
      this.productApiService.getProductById(item.productId)
    );

    forkJoin(requests).subscribe({
      next: (products) => {
        this.cartProducts = products.map((product, index) => {
          const cartItem = this.storedCartItems[index];

          return {
            productId: product.productId,
            title: product.title,
            imageUrl: product.imageUrl,
            discountedPrice: product.discountedPrice,
            originalPrice: product.originalPrice,
            quantity: cartItem.quantity
          };
        });

        this.recalculate();
      },
      error: (err) => console.error(err)
    });
  }

  recalculate() {
    this.subTotal = this.cartProducts.reduce((sum, item) => {
      return sum + item.discountedPrice * item.quantity;
    }, 0);

    this.calculateDeliveryCharge();

    const discount = this.couponApplied ? this.coupon.discountAmount : 0;

    this.grandTotal = this.subTotal + this.deliveryCharge - discount;
  }

  applyCoupon() {
    this.couponApplied = true;

    // makes an API call to the backend to get the data
    this.coupon.couponCode = "VULCAN";
    this.coupon.couponType = "percentage";
    this.coupon.couponValue = 30;
    this.coupon.discountAmount = 100;
  }

  calculateDeliveryCharge() {
    if (this.subTotal < 300) {
      this.deliveryCharge = 50;
    } else {
      this.deliveryCharge = 0;
    }
  }

  clearCart(){
    this.cartService.clearCart();
    this.cartProducts = [];
    this.subTotal = 0;
    this.deliveryCharge = 0;
    this.grandTotal = 0;
  }

  redirectToProductsPage(){
    this.router.navigateByUrl('/listing-page');
  }

  checkoutPage() {
    this.router.navigateByUrl('/checkout');
  }
}

export interface CartProduct {
  productId: number;
  title: string;
  imageUrl: string;
  originalPrice?: number;
  discountedPrice: number;
  quantity: number;
}

export interface Coupon {
  couponCode: string;
  couponType: string; // percentage, amount
  couponValue: number; // 10%      , rupees 100
  discountAmount: number;
}
