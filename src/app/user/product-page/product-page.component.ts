import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ProductCardData, ProductDetails} from '../../products.interface';
import {ProductCardComponent} from '../homepage/product-card/product-card.component';

@Component({
  selector: 'app-product-page',
  imports: [
    NgIf,
    NgForOf,
    ProductCardComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  product: ProductDetails = {
    productId: 1,
    title: 'Heart Shaped Scented Candles, Made from pure wax and reusable',
    imageUrl: [],
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on',
    discountedPrice: 99,
    originalPrice: 120,
    similarProductIds: [2, 3, 4]
  }

  inCartQuantity: number = 0;

  addProductToCart(){
    console.log('Product added to cart');
    this.inCartQuantity++;
  }

  increaseQuantity(){
    this.inCartQuantity++;
  }

  decreaseQuantity(){
    this.inCartQuantity--;
  }

  bestSellersList: ProductCardData[] = [
    {
      productId:1,
      title: "Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 120,
    },
    {
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },
    {
      productId:3,
      title: "Third Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 120,
    }
  ]

  // image carousel
  currentImageIndex = 0;

  // temp
  images = [
    "/product-test/01.png",
    "/product-test/02.png",
    "/product-test/03.png",
  ];

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
}
