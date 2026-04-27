import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CollectionCardComponent } from '../collections/collection-card/collection-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { NgForOf } from '@angular/common';
import { CollectionCardData, ProductCardData } from '../../products.interface';
import { HomepageApiService } from '../services/homepage-api.service';
import { ProductsApiService } from '../services/products-api.service';
import { CollectionsApiService } from '../services/collections-api.service';
import { forkJoin } from 'rxjs';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-homepage',
  imports: [
    HeroSectionComponent,
    CollectionCardComponent,
    ProductCardComponent,
    NgForOf,
    NgxTypedJsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private homepageApiService: HomepageApiService,
    private productsApiService: ProductsApiService,
    private collectionsApiService: CollectionsApiService
  ) {
  }

  bannerImageUrls!: string[];
  collectionsIds!: number[];
  bestSellersIds!: number[];
  reviews!: string[];
   
  collectionsList!: CollectionCardData[];
  bestSellersList!: ProductCardData[];

  ngOnInit() {
    this.getHomePageData();
  }

  getHomePageData() {
    // make api call and store data in different lists
    this.homepageApiService.getHomePageData().subscribe({
      next: (data) => {
        this.bannerImageUrls = data.bannerImageUrls;
        this.collectionsIds = data.featuredCollections;
        this.bestSellersIds = data.bestSellers;
        this.reviews = data.reviews;

        this.fetchCollectionDetails();
        this.fetchBestSellerProducts();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  fetchCollectionDetails() {
    const requests = this.collectionsIds.map(id =>
      this.collectionsApiService.getCollectionById(id)
    );

    forkJoin(requests).subscribe({
      next: (data) => {
        this.collectionsList = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  fetchBestSellerProducts() {
    const requests = this.bestSellersIds.map(id =>
      this.productsApiService.getProductById(id)
    );

    forkJoin(requests).subscribe({
      next: (data) => {
        this.bestSellersList = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  redirectToCollectionsPage(){
    this.router.navigateByUrl('/collections');
  }

  redirectToProductsPage(){
    this.router.navigateByUrl('/listing-page');
  }
}
