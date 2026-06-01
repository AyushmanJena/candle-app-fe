import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomepageData } from '../interfaces/homepage-data.interface';

@Injectable({
  providedIn: 'root'
})
export class HomepageManagementService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080";

  getHomepageData(){
    return this.http.get<HomepageData>(this.baseUrl + '/home-data');
  }

  updateHomepageData(formValue: any){
    const body : HomepageData = {
      bannerImageUrls: formValue.bannerImageUrls ?? [],
      featuredCollections: formValue.featuredCollections ?? [],
      bestSellers: formValue.bestSellers ?? [],
      reviews: formValue.reviews ?? [],
    }
    return this.http.post<HomepageData>(this.baseUrl + '/admin/home-data', body);
  }
}
