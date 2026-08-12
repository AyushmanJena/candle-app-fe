import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import { CartService } from '../../../shared/services/cart-service.service';
import { ProductCardData } from '../../interface/Product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy {

    @Input()
  showAddToCartButton! : boolean;

  @Input()
  productCardData!: ProductCardData;

  inCartQuantity: number = 0;
  private cartSubscription?: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(){
    this.inCartQuantity = this.cartService.getCartItemQuantityById(this.productCardData.productId);
    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.inCartQuantity = this.cartService.getCartItemQuantityById(this.productCardData.productId);
    });

  } 

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  redirectToProductDetails(productId: number){
    this.router.navigateByUrl('/product/'+productId);
  }

  addProductToCart(){
    console.log('Product Add to Cart');
    this.increaseQuantity();
  }

  increaseQuantity(){
    this.inCartQuantity++;
    this.cartService.addToCart(this.productCardData.productId);
  }

  decreaseQuantity(){
    this.inCartQuantity--;
    this.cartService.removeFromCart(this.productCardData.productId);
  }
}
