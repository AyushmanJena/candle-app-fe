import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ProductCardData, ProductDetails } from '../../products.interface';
import { ProductCardComponent } from '../homepage/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { ProductsApiService } from '../services/products-api.service';
import { forkJoin } from 'rxjs';
import {CartService} from '../../shared/services/cart-service.service';
import { ActivatedRoute } from '@angular/router';

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
export class ProductPageComponent implements OnInit {

  bestSellersList!: ProductCardData[];

  product!: ProductDetails;
  inCartQuantity: number = 0;

  // image carousel
  currentImageIndex = 0;

  images: string[] = [];
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private productApiService: ProductsApiService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails();
  }

  loadProductDetails() {
    // make api call to fetch product details by Id
    this.productApiService.getProductDetailsById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        this.loadProductImages();
        this.loadSimilarProducts();
        this.inCartQuantity = this.cartService.getCartItemQuantityById(this.product.productId);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadProductImages() {
    this.images = this.product.imageUrl.map(
      image => image.imageUrl
    );
  }

  loadSimilarProducts() {
    const ids = this.product.similarProductIds || [];

    const requests = ids.map(id =>
      this.productApiService.getProductById(id)
    );

    forkJoin(requests).subscribe({
      next: (data) => {
        this.bestSellersList = data; // full list at once
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addProductToCart() {
    console.log('Product added to cart');
    this.inCartQuantity++;
    this.cartService.addToCart(this.product.productId);
  }

  increaseQuantity() {
    this.inCartQuantity++;
    this.cartService.addToCart(this.product.productId);
  }

  decreaseQuantity() {
    this.inCartQuantity--;
    this.cartService.addToCart(this.product.productId);
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
}
