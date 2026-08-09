import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePageData } from '../interface/HomePageData.interface';

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
