import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductCardData} from '../../../products.interface';
import {NgIf} from '@angular/common';
import {CartProduct} from '../cart-page.component';

@Component({
  selector: 'app-cart-product-card',
  imports: [
    NgIf
  ],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css'
})
export class CartProductCardComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(){
    this.calculateProductTotal();
  }

  total: number = 0;

  @Input()
  cartProduct!: CartProduct;

  calculateProductTotal(){
    this.total = this.cartProduct.quantity * this.cartProduct.discountedPrice;
  }

  increment(){
    if(this.cartProduct.quantity < 30){
      this.cartProduct.quantity++;
      this.calculateProductTotal()
    }

  }
  decrement(){
    if(this.cartProduct.quantity > 0){
      this.cartProduct.quantity--;
      this.calculateProductTotal()
    }
  }

  redirectToProductDetails(productId: number){
    this.router.navigateByUrl('/product/'+productId);
  }
}
