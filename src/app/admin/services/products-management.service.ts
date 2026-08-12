import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminNewProductRequest, AdminProductDetails, AdminProductsList } from '../interfaces/products-admin.interface';
import { MockAdminApiService } from '../../mock/mock-admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsManagementService {

  constructor(
    private mockAdminApiService: MockAdminApiService,
  ) { }

  getAllProducts(): Observable<AdminProductsList[]> {
    return this.mockAdminApiService.getAllProducts();
  }

  getProductDetailsById(productId: number): Observable<AdminProductDetails> {
    return this.mockAdminApiService.getProductDetailsById(productId);
  }

  createProduct(formValue: any): Observable<AdminProductDetails> {
    return this.mockAdminApiService.createProduct(formValue);
  }

  updateProduct(productId: number, formValue: any): Observable<AdminProductDetails> {
    return this.mockAdminApiService.updateProduct(productId, formValue);
  }


}
