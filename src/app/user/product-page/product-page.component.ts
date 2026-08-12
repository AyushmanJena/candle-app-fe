import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ProductCardComponent } from '../homepage/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { ProductsApiService } from '../services/products-api.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import {CartService} from '../../shared/services/cart-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageViewerService } from './image-carousel/image-viewer.service';
import { ImageCarouselComponent } from "./image-carousel/image-carousel.component";
import { ProductCardData, ProductDetails } from '../interface/Product.interface';
import { MockApiService } from '../../mock/mock-api.service';

@Component({
  selector: 'app-product-page',
  imports: [
    NgIf,
    NgForOf,
    ProductCardComponent,
    ImageCarouselComponent
],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit, OnDestroy {

  bestSellersList!: ProductCardData[];

  product!: ProductDetails;
  inCartQuantity: number = 0;
  private readonly destroy$ = new Subject<void>();

  // image carousel
  currentImageIndex = 0;

  images: string[] = [];
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private productApiService: MockApiService,
    private cartService: CartService,
    private imageViewer : ImageViewerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.productId = Number(params.get('id'));
        this.currentImageIndex = 0;
        this.bestSellersList = [];
        this.images = [];
        this.loadProductDetails();
      });

    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.product) {
          this.inCartQuantity = this.cartService.getCartItemQuantityById(this.product.productId);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    if (!this.product || this.product.quantityAvailable === 0) {
      return;
    }
    console.log('Product added to cart');
    this.cartService.addToCart(this.product.productId);
  }

  increaseQuantity() {
    const availableQuantity = this.product?.quantityAvailable ?? 0;

    if (!this.product || availableQuantity === 0) {
      return;
    }
    if (this.inCartQuantity >= availableQuantity) {
      return;
    }
    this.inCartQuantity++;
    this.cartService.addToCart(this.product.productId);
  }

  decreaseQuantity() {
    if (!this.product) {
      return;
    }
    this.inCartQuantity--;
    this.cartService.removeFromCart(this.product.productId);
  }

  nextImage() {
    if (this.images.length === 0) {
      return;
    }
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    if (this.images.length === 0) {
      return;
    }
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  openGallery() {
    if (this.images.length === 0) {
      return;
    }
    this.imageViewer.open(
      this.images,0
    );
  }

  navigateToProductDetails(productId: number) {
    this.router.navigateByUrl('/product/' + productId);
  }
}
