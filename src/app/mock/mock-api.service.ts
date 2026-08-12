import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  MOCK_DB
} from './mock-database';
import { ProductCardData, ProductDetails } from '../user/interface/Product.interface';
import { CollectionCardData } from '../user/interface/Collections.interface';
import { HomePageData } from '../user/interface/HomePageData.interface';
import { OrderDetailsResponse } from '../user/interface/TrackOrderDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  /*
   * Simulated network delay.
   *
   * This can be set to 0 if you want instant responses.
   */
  private readonly API_DELAY = 300;


  // ============================================================
  // PRODUCTS
  // ============================================================

  getAllProducts(): Observable<ProductCardData[]> {

    return of(
      MOCK_DB.products.map(product => ({
        ...product
      }))
    ).pipe(
      delay(this.API_DELAY)
    );
  }


  getProductById(
    id: number
  ): Observable<ProductCardData> {

    const product =
      MOCK_DB.products.find(
        product => product.productId === id
      );

    if (!product) {
      return throwError(() => new Error(`Product with id ${id} not found`));
    }

    return of({
      ...product
    }).pipe(
      delay(this.API_DELAY)
    );
  }


  getProductDetailsById(
    productId: number
  ): Observable<ProductDetails> {

    const product =
      MOCK_DB.productDetails.find(
        product => product.productId === productId
      );

    if (!product) {
      return throwError(() => new Error(`Product details with id ${productId} not found`));
    }

    return of({
      ...product,

      imageUrl: product.imageUrl.map(image => ({
        ...image
      })),

      similarProductIds:
        product.similarProductIds
          ? [...product.similarProductIds]
          : undefined
    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // COLLECTIONS
  // ============================================================

  getAllCollections(): Observable<CollectionCardData[]> {

    return of(
      MOCK_DB.collections.map(collection => ({
        collectionId: collection.collectionId,
        title: collection.title,
        imageUrl: collection.imageUrl,
        url: collection.url,
        productsList: [...collection.productsList]
      }))
    ).pipe(
      delay(this.API_DELAY)
    );
  }


  getCollectionById(
    id: number
  ): Observable<CollectionCardData> {

    const collection =
      MOCK_DB.collections.find(
        collection =>
          collection.collectionId === id
      );

    if (!collection) {
      return throwError(() => new Error(`Collection with id ${id} not found`));
    }

    return of({
      collectionId: collection.collectionId,
      title: collection.title,
      imageUrl: collection.imageUrl,
      url: collection.url,
      productsList: [...collection.productsList]
    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // HOMEPAGE
  // ============================================================

  getHomePageData(): Observable<HomePageData> {

    return of({

      bannerImageUrls:
        [...MOCK_DB.homepage.bannerImageUrls],

      featuredCollections:
        [...MOCK_DB.homepage.featuredCollections],

      bestSellers:
        [...MOCK_DB.homepage.bestSellers],

      reviews:
        [...MOCK_DB.homepage.reviews]

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // ORDER TRACKING
  // ============================================================

  getOrderDetailsById(
    orderId: number
  ): Observable<OrderDetailsResponse> {

    const order =
      MOCK_DB.orders.find(
        order => order.orderId === orderId
      );

    if (!order) {
      return throwError(() => new Error(`Order with id ${orderId} not found`));
    }

    return of({

      ...order,

      items: order.items.map(item => ({
        ...item
      }))

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // PAYMENT
  // ============================================================

  createRazorpayOrder(
    amount: number
  ): Observable<{ orderId: string }> {

    /*
     * This does NOT contact Razorpay.
     *
     * It simply behaves like the backend's
     * /payment/create-order endpoint.
     */

    const mockRazorpayOrderId =
      `order_mock_${Date.now()}`;


    console.log(
      '[MOCK RAZORPAY] Creating order:',
      {
        amount,
        orderId: mockRazorpayOrderId
      }
    );


    return of({
      orderId: mockRazorpayOrderId
    }).pipe(
      delay(this.API_DELAY)
    );
  }


  verifyAndSave(
    payload: any
  ): Observable<{
    orderId: number;
    status: string;
  }> {

    /*
     * Simulates successful Razorpay verification.
     */

    console.log(
      '[MOCK RAZORPAY] Verifying payment:',
      payload
    );


    const nextOrderId =
      this.getNextOrderId();


    return of({

      orderId: nextOrderId,

      status: 'SUCCESS'

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // INTERNAL HELPERS
  // ============================================================

  private getNextOrderId(): number {

    if (MOCK_DB.orders.length === 0) {
      return 1001;
    }

    return Math.max(
      ...MOCK_DB.orders.map(
        order => order.orderId
      )
    ) + 1;
  }

}
