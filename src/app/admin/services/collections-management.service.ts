import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionRequest, CollectionsList } from '../interfaces/collections.interface';
import { MockAdminApiService } from '../../mock/mock-admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsManagementService {

  constructor(
    private mockAdminApiService: MockAdminApiService,
  ) { }

  getAllCollections(): Observable<CollectionsList[]> {
    return this.mockAdminApiService.getAllCollections();
  }

  getCollectionDetailsById(collectionId: number): Observable<CollectionsList> {
    return this.mockAdminApiService.getCollectionDetailsById(collectionId);
  }

  createCollection(formValue: any): Observable<CollectionsList> {
    return this.mockAdminApiService.createCollection(formValue);
  }

  updateCollection(collectionId: number, formValue: any): Observable<CollectionsList> {
    return this.mockAdminApiService.updateCollection(collectionId, formValue);
  }

  deleteCollection(collectionId: number): Observable<void> {
    return this.mockAdminApiService.deleteCollection(collectionId);
  }
}
