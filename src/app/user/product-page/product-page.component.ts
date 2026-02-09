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
    description: 'lorem ipsum xyz',
    discountedPrice: 99,
    originalPrice: 120,
    similarProductIds: [2, 3, 4]
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
