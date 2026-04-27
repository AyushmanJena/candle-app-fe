import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ProductCardData} from '../../../products.interface';
import {NgIf} from '@angular/common';
import {CartProduct} from '../cart-page.component';
import { CartService } from '../../../shared/services/cart-service.service';

@Component({
  selector: 'app-cart-product-card',
  imports: [
    NgIf
  ],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css'
})
export class CartProductCardComponent implements OnInit {
  constructor(
    private router: Router,
    private cartService: CartService
  ) {
  }

  @Output()
  quantityChanged = new EventEmitter<void>();

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
      this.cartService.addToCart(this.cartProduct.productId);
      this.calculateProductTotal()
      this.quantityChanged.emit();
    }
  }


  decrement(){
    if(this.cartProduct.quantity > 0){
      this.cartProduct.quantity--;
      this.cartService.removeFromCart(this.cartProduct.productId);
      this.calculateProductTotal()
      this.quantityChanged.emit();
    }
  }

  redirectToProductDetails(productId: number){
    this.router.navigateByUrl('/product/'+productId);
  }
}
