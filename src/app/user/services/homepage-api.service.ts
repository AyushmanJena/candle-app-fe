import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCardData, ProductDetails } from '../../products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageApiService {

  private baseUrl = "http://localhost:8080/";

  constructor(
    private http: HttpClient,
  ){}

  getHomePageData(){
    return this.http.get<HomePageData>(this.baseUrl + 'home-data');
  }


}

interface HomePageData{
  bannerImageUrls: string[];
  featuredCollections: number[];
  bestSellers: number[];
  reviews: string[];
}
