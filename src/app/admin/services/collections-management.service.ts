import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionRequest, CollectionsList } from '../interfaces/collections.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionsManagementService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080";

  getAllCollections() {
    return this.http.get<CollectionsList[]>(this.baseUrl + '/collections');
  }

  getCollectionDetailsById(collectionId : number){
    return this.http.get<CollectionsList>(this.baseUrl + '/collections/' + collectionId);
  }

  createCollection(formValue: any){
    const body: CollectionRequest = {
      title: formValue.title,
      imageUrl: formValue.imageUrl,
      productsList: formValue.productsList,
      url: "/dummy"
    }

    return this.http.post<any>(this.baseUrl + '/admin/collections', body);
  }

  updateCollection(collectionId: number, formValue: any){
    const body: CollectionRequest = {
      title: formValue.title,
      imageUrl: formValue.imageUrl,
      productsList: formValue.productsList,
      url: "/dummy"
    }

    return this.http.put<any>(this.baseUrl + '/admin/collections/' + collectionId, body);
  }

  deleteCollection(collectionId: number){
    return this.http.delete<any>(this.baseUrl + '/admin/collections/' + collectionId);
  }
}
