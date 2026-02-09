import {Component, OnInit} from '@angular/core';
import {CartProductCardComponent} from './cart-product-card/cart-product-card.component';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [
    CartProductCardComponent,
    CommonModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements  OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
      this.applyCoupon();
      this.calculateDeliveryCharge();
    this.calculateTotals();
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


  cartItems: CartProduct[] = [
    {productId:1, title: "Product 1",imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",  originalPrice: 129, discountedPrice: 99, quantity: 2},
    {productId:2, title: "Product 2",imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",   originalPrice: 129, discountedPrice: 99, quantity: 2},
    {productId:3, title: "Product 3",imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",   discountedPrice: 99, quantity: 3},
  ]

  applyCoupon(){
    this.couponApplied = true;

    // makes an API call to the backend to get the data
    this.coupon.couponCode = "VULCAN";
    this.coupon.couponType = "percentage";
    this.coupon.couponValue = 30;
    this.coupon.discountAmount = 100;

  }

  calculateDeliveryCharge(){
    if(this.deliveryCharge < 300){
      this.deliveryCharge = 50;
    }else{
      this.deliveryCharge = 0;
    }
  }

  calculateTotals(){
    for(let product in this.cartItems){
      this.subTotal += this.cartItems[product].discountedPrice;
    }

    this.grandTotal = this.subTotal + this.deliveryCharge - (this.couponApplied? this.coupon.discountAmount : 0);
  }

  checkoutPage(){
    this.router.navigateByUrl('/checkout');
  }
}

export interface CartProduct{
  productId: number;
  title: string;
  imageUrl: string;
  originalPrice?: number;
  discountedPrice: number;
  quantity: number;
}

export interface Coupon{
  couponCode: string;
  couponType: string; // percentage, amount
  couponValue: number; // 10%      , rupees 100
  discountAmount: number;
}
