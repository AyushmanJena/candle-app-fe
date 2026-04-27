import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductCardData, ProductDetails} from '../../products.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080/";

  getAllProducts(): Observable<ProductCardData[]>{
    return this.http.get<ProductCardData[]>(this.baseUrl + 'products');
  }

  getProductById(id: number): Observable<ProductCardData>{
    return this.http.get<ProductCardData>(this.baseUrl + 'products/' + id);
  }

  getProductDetailsById(productId: number): Observable<ProductDetails>{
    return this.http.get<ProductDetails>(this.baseUrl + 'product-details/' + productId);
  }
}
