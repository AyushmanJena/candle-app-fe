import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionCardData } from '../../products.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionsApiService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = "http://localhost:8080/";

  getAllCollections(){
    return this.http.get<CollectionCardData[]>(this.baseUrl + 'collections');
  }

  getCollectionById(id: number){
    return this.http.get<CollectionCardData>(this.baseUrl + 'collections/' + id);
  }
}
