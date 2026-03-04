import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardData} from '../../../products.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  constructor(private router: Router) {
  }

  @Input()
  showAddToCartButton! : boolean;

  @Input()
  productCardData!: ProductCardData;

  redirectToProductDetails(productId: number){
    this.router.navigateByUrl('/product/'+productId);
  }

  addProductToCart(){
    console.log('Product Add to Cart');
    this.increaseQuantity();
  }

  inCartQuantity: number = 0;

  increaseQuantity(){
    this.inCartQuantity++;
  }

  decreaseQuantity(){
    this.inCartQuantity--;
  }
}
