import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminNewProductRequest, AdminProductDetails, AdminProductsList } from '../interfaces/products-admin.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsManagementService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080";

  getAllProducts() {
    return this.http.get<AdminProductsList[]>(this.baseUrl + '/products');
  }

  getProductDetailsById(productId: number) {
    return this.http.get<AdminProductDetails>(this.baseUrl + '/product-details/' + productId);
  }

  createProduct(formValue: any ){
    const body: AdminNewProductRequest = {
    title: formValue.title,
    description: formValue.description,
    originalPrice: formValue.originalPrice,
    discountedPrice: formValue.discountedPrice,
    quantityAvailable: formValue.quantityAvailable,
    similarProductIds: formValue.similarProductIds ?? []
  };

  let params = new HttpParams();
  (formValue.imageUrls as { imageId: number; displayOrder: number; imageUrl: string }[] ?? [])
    .map(entry => entry.imageUrl)
    .filter(url => !!url)
    .forEach(url => params = params.append('imageUrls', url));

  return this.http.post<any>(
    `${this.baseUrl}/admin/product-details`,
    body,
    { params }
  );
  }

  updateProduct(productId: number, formValue: any) {
    const body: AdminNewProductRequest = {
      title: formValue.title,
      description: formValue.description,
      originalPrice: formValue.originalPrice,
      discountedPrice: formValue.discountedPrice,
      quantityAvailable: formValue.quantityAvailable,
      similarProductIds: formValue.similarProductIds ?? []
    };

    let params = new HttpParams();
    (formValue.imageUrls as { imageId: number; displayOrder: number; imageUrl: string }[] ?? [])
      .map(entry => entry.imageUrl)
      .filter(url => !!url)
      .forEach(url => params = params.append('imageUrls', url));

    return this.http.put<any>(
      `${this.baseUrl}/admin/product-details/${productId}`,
      body,
      { params }
    );

  }


}