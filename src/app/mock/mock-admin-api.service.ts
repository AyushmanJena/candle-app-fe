import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  MOCK_DB
} from './mock-database';
import { CollectionRequest, CollectionsList } from '../admin/interfaces/collections.interface';
import { CouponRequest, CouponsList } from '../admin/interfaces/coupons.interface';
import { HomepageData } from '../admin/interfaces/homepage-data.interface';
import { OrderDetailsResponse, OrdersList } from '../admin/interfaces/orders.interface';
import { AdminNewProductRequest, AdminProductDetails, AdminProductsList } from '../admin/interfaces/products-admin.interface';
import { DeliveryStatus } from '../user/interface/TrackOrderDetails.interface';


@Injectable({
  providedIn: 'root'
})
export class MockAdminApiService {

  private readonly API_DELAY = 300;


  // ============================================================
  // COLLECTION MANAGEMENT
  // ============================================================

  getAllCollections(): Observable<CollectionsList[]> {

    return of(
      MOCK_DB.collections.map(collection => ({
        ...collection,
        productsList: [
          ...collection.productsList
        ]
      }))
    ).pipe(
      delay(this.API_DELAY)
    );
  }


  getCollectionDetailsById(
    collectionId: number
  ): Observable<CollectionsList> {

    const collection =
      MOCK_DB.collections.find(
        collection =>
          collection.collectionId === collectionId
      );

    if (!collection) {
      return throwError(() => new Error(`Collection with id ${collectionId} not found`));
    }

    return of({

      ...collection,

      productsList:
        [...collection.productsList]

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  createCollection(
    formValue: any
  ): Observable<CollectionsList> {

    const collectionId =
      this.getNextCollectionId();


    const body: CollectionRequest = {

      title:
        formValue.title,

      imageUrl:
        formValue.imageUrl,

      productsList:
        formValue.productsList ?? [],

      url:
        '/collections/' + collectionId
    };


    const newCollection: CollectionsList = {

      collectionId,

      title:
        body.title,

      imageUrl:
        body.imageUrl,

      productsList:
        [...body.productsList],

      url:
        body.url
    };


    MOCK_DB.collections.push(
      newCollection
    );


    return of({
      ...newCollection,

      productsList:
        [...newCollection.productsList]

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  updateCollection(
    collectionId: number,
    formValue: any
  ): Observable<CollectionsList> {

    const index =
      MOCK_DB.collections.findIndex(
        collection =>
          collection.collectionId === collectionId
      );


    if (index === -1) {
      return throwError(() => new Error(`Collection with id ${collectionId} not found`));
    }


    const body: CollectionRequest = {

      title:
        formValue.title,

      imageUrl:
        formValue.imageUrl,

      productsList:
        formValue.productsList ?? [],

      url:
        '/collections/' + collectionId
    };


    MOCK_DB.collections[index] = {

      ...MOCK_DB.collections[index],

      title:
        body.title,

      imageUrl:
        body.imageUrl,

      productsList:
        [...body.productsList],

      url:
        body.url

    };


    return of({

      ...MOCK_DB.collections[index],

      productsList:
        [...MOCK_DB.collections[index].productsList]

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  deleteCollection(
    collectionId: number
  ): Observable<void> {

    const index =
      MOCK_DB.collections.findIndex(
        collection =>
          collection.collectionId === collectionId
      );


    if (index !== -1) {

      MOCK_DB.collections.splice(
        index,
        1
      );

    }


    return of(void 0).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // COUPON MANAGEMENT
  // ============================================================

  getAllCoupons(): Observable<CouponsList[]> {

    return of(
      MOCK_DB.coupons.map(coupon => ({
        ...coupon
      }))
    ).pipe(
      delay(this.API_DELAY)
    );
  }


  createCoupon(
    formValue: any
  ): Observable<CouponsList> {

    const request: CouponRequest = {

      couponCode:
        formValue.couponCode,

      discountPercentage:
        formValue.discountPercentage,

      minimumPurchase:
        formValue.minimumPurchase,

      activeStatus:
        true
    };


    const newCoupon: CouponsList = {

      couponId:
        this.getNextCouponId(),

      couponCode:
        request.couponCode,

      discountPercentage:
        request.discountPercentage,

      minimumPurchase:
        request.minimumPurchase,

      activeStatus:
        request.activeStatus

    };


    MOCK_DB.coupons.push(
      newCoupon
    );


    return of({
      ...newCoupon
    }).pipe(
      delay(this.API_DELAY)
    );
  }


  changeCouponStatus(
    couponId: number
  ): Observable<CouponsList> {

    const coupon =
      MOCK_DB.coupons.find(
        coupon =>
          coupon.couponId === couponId
      );


    if (!coupon) {
      return throwError(() => new Error(`Coupon with id ${couponId} not found`));
    }


    coupon.activeStatus =
      !coupon.activeStatus;


    console.log(
      '[MOCK COUPON] Toggled:',
      couponId,
      coupon.activeStatus
    );


    return of({
      ...coupon
    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // HOMEPAGE MANAGEMENT
  // ============================================================

  getHomepageData(): Observable<HomepageData> {

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


  updateHomepageData(
    formValue: any
  ): Observable<HomepageData> {

    MOCK_DB.homepage = {

      bannerImageUrls:
        formValue.bannerImageUrls ?? [],

      featuredCollections:
        formValue.featuredCollections ?? [],

      bestSellers:
        formValue.bestSellers ?? [],

      reviews:
        formValue.reviews ?? []

    };


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
  // ORDER MANAGEMENT
  // ============================================================

  getAllOrders(): Observable<OrdersList[]> {

    const orders: OrdersList[] =
      MOCK_DB.orders.map(order => ({

        orderId:
          order.orderId,

        customerName:
          order.customerName,

        phoneNumber:
          order.phoneNumber,

        orderItemsCount:
          order.items.reduce(
            (total, item) =>
              total + item.quantity,
            0
          ),

        orderAmount:
          order.grandTotal,

        orderStatus:
          order.orderStatus

      }));


    return of(orders).pipe(
      delay(this.API_DELAY)
    );
  }


  getOrderDetailsById(
    orderId: number
  ): Observable<OrderDetailsResponse> {

    const order =
      MOCK_DB.orders.find(
        order =>
          order.orderId === orderId
      );


    if (!order) {
      return throwError(() => new Error(`Order with id ${orderId} not found`));
    }


    return of({

      ...order,

      items:
        order.items.map(item => ({
          ...item
        }))

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  changeOrderStatus(
    orderId: number,
    newStatus: DeliveryStatus
  ): Observable<OrderDetailsResponse> {

    const order =
      MOCK_DB.orders.find(
        order =>
          order.orderId === orderId
      );


    if (!order) {
      return throwError(() => new Error(`Order with id ${orderId} not found`));
    }


    order.orderStatus =
      newStatus;


    console.log(
      '[MOCK ORDER] Status changed:',
      orderId,
      newStatus
    );


    return of({

      ...order,

      items:
        order.items.map(item => ({
          ...item
        }))

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // PRODUCT MANAGEMENT
  // ============================================================

  getAllProducts(): Observable<AdminProductsList[]> {

    const products: AdminProductsList[] =
      MOCK_DB.productDetails.map(product => ({

        productId:
          product.productId,

        title:
          product.title,

        originalPrice:
          product.originalPrice,

        discountedPrice:
          product.discountedPrice,

        inStock:
          product.quantityAvailable! > 0

      }));


    return of(products).pipe(
      delay(this.API_DELAY)
    );
  }


  getProductDetailsById(
    productId: number
  ): Observable<AdminProductDetails> {

    const product = MOCK_DB.productDetails.find(
      product => product.productId === productId
    );

    if (!product) {
      return throwError(() => new Error(`Product with id ${productId} not found`));
    }

    const response: AdminProductDetails = {
      productId: product.productId,
      title: product.title,
      imageUrl: product.imageUrl.map(image => ({
        ...image
      })),
      description: product.description,
      originalPrice: product.originalPrice,
      discountedPrice: product.discountedPrice,
      quantityAvailable: product.quantityAvailable ?? 0,
      similarProductIds: [
        ...(product.similarProductIds ?? [])
      ]
    };

    return of(response).pipe(
      delay(this.API_DELAY)
    );
  }


  createProduct(
    formValue: any
  ): Observable<AdminProductDetails> {

    const productId =
      this.getNextProductId();


    const body: AdminNewProductRequest = {

      title:
        formValue.title,

      description:
        formValue.description,

      originalPrice:
        formValue.originalPrice,

      discountedPrice:
        formValue.discountedPrice,

      quantityAvailable:
        formValue.quantityAvailable,

      similarProductIds:
        formValue.similarProductIds ?? []

    };


    /*
     * The real API receives image URLs through HttpParams.
     *
     * In the mock version, formValue.imageUrls is used
     * directly.
     */

    const imageEntries =
      (formValue.imageUrls ?? []) as {
        imageId?: number;
        displayOrder?: number;
        imageUrl: string;
      }[];


    const images = imageEntries

      .filter(entry =>
        !!entry.imageUrl
      )

      .map((entry, index) => ({

        imageId:
          entry.imageId ??
          Date.now() + index,

        displayOrder:
          entry.displayOrder ??
          index + 1,

        imageUrl:
          entry.imageUrl

      }));


    const newProduct: AdminProductDetails = {

      productId,

      title:
        body.title,

      description:
        body.description,

      originalPrice:
        body.originalPrice,

      discountedPrice:
        body.discountedPrice,

      quantityAvailable:
        body.quantityAvailable,

      similarProductIds:
        [...body.similarProductIds],

      imageUrl:
        images

    };


    MOCK_DB.productDetails.push(
      newProduct
    );


    /*
     * Keep the user-facing product data synchronized.
     */

    const firstImage =
      images[0]?.imageUrl ?? '';


    MOCK_DB.products.push({

      productId,

      title:
        newProduct.title,

      imageUrl:
        firstImage,

      description:
        newProduct.description,

      discountedPrice:
        newProduct.discountedPrice,

      originalPrice:
        newProduct.originalPrice ??
        newProduct.discountedPrice,

      inStock:
        newProduct.quantityAvailable > 0

    });


    return of({

      ...newProduct,

      imageUrl:
        newProduct.imageUrl.map(image => ({
          ...image
        })),

      similarProductIds:
        [...newProduct.similarProductIds]

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  updateProduct(
    productId: number,
    formValue: any
  ): Observable<AdminProductDetails> {

    const productIndex =
      MOCK_DB.productDetails.findIndex(
        product =>
          product.productId === productId
      );


    if (productIndex === -1) {
      return throwError(() => new Error(`Product with id ${productId} not found`));
    }


    const existingProduct =
      MOCK_DB.productDetails[productIndex];


    const body: AdminNewProductRequest = {

      title:
        formValue.title,

      description:
        formValue.description,

      originalPrice:
        formValue.originalPrice,

      discountedPrice:
        formValue.discountedPrice,

      quantityAvailable:
        formValue.quantityAvailable,

      similarProductIds:
        formValue.similarProductIds ?? []

    };


    const imageEntries =
      (formValue.imageUrls ?? []) as {
        imageId?: number;
        displayOrder?: number;
        imageUrl: string;
      }[];


    const images = imageEntries

      .filter(entry =>
        !!entry.imageUrl
      )

      .map((entry, index) => ({

        imageId:
          entry.imageId ??
          Date.now() + index,

        displayOrder:
          entry.displayOrder ??
          index + 1,

        imageUrl:
          entry.imageUrl

      }));


    const updatedProduct: AdminProductDetails = {

      ...existingProduct,

      title:
        body.title,

      description:
        body.description,

      originalPrice:
        body.originalPrice,

      discountedPrice:
        body.discountedPrice,

      quantityAvailable:
        body.quantityAvailable,

      similarProductIds:
        [...body.similarProductIds],

      imageUrl:
        images

    };


    MOCK_DB.productDetails[productIndex] =
      updatedProduct;


    /*
     * Synchronize the customer-facing product.
     */

    const userProductIndex =
      MOCK_DB.products.findIndex(
        product =>
          product.productId === productId
      );


    if (userProductIndex !== -1) {

      MOCK_DB.products[userProductIndex] = {

        ...MOCK_DB.products[userProductIndex],

        title:
          updatedProduct.title,

        imageUrl:
          updatedProduct.imageUrl[0]?.imageUrl ??
          MOCK_DB.products[userProductIndex].imageUrl,

        description:
          updatedProduct.description,

        discountedPrice:
          updatedProduct.discountedPrice,

        originalPrice:
          updatedProduct.originalPrice ??
          updatedProduct.discountedPrice,

        inStock:
          updatedProduct.quantityAvailable > 0

      };

    }


    return of({

      ...updatedProduct,

      imageUrl:
        updatedProduct.imageUrl.map(image => ({
          ...image
        })),

      similarProductIds:
        [...updatedProduct.similarProductIds]

    }).pipe(
      delay(this.API_DELAY)
    );
  }


  // ============================================================
  // INTERNAL ID GENERATORS
  // ============================================================

  private getNextProductId(): number {

    if (MOCK_DB.productDetails.length === 0) {
      return 1;
    }

    return Math.max(
      ...MOCK_DB.productDetails.map(
        product =>
          product.productId
      )
    ) + 1;
  }


  private getNextCollectionId(): number {

    if (MOCK_DB.collections.length === 0) {
      return 1;
    }

    return Math.max(
      ...MOCK_DB.collections.map(
        collection =>
          collection.collectionId
      )
    ) + 1;
  }


  private getNextCouponId(): number {

    if (MOCK_DB.coupons.length === 0) {
      return 1;
    }

    return Math.max(
      ...MOCK_DB.coupons.map(
        coupon =>
          coupon.couponId
      )
    ) + 1;
  }

}
