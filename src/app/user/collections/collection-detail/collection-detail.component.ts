import { Component, OnInit } from '@angular/core';
import {CollectionCardData, ProductCardData} from '../../../products.interface';
import {NgForOf} from '@angular/common';
import {ProductCardComponent} from '../../homepage/product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { CollectionsApiService } from '../../services/collections-api.service';
import { ProductsApiService } from '../../services/products-api.service';

@Component({
  selector: 'app-collection-detail',
  imports: [
    NgForOf,
    ProductCardComponent
  ],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.css'
})
export class CollectionDetailComponent implements OnInit{
  collectionProducts: ProductCardData[] = [  ]

  constructor(
    private route: ActivatedRoute,
    private collectionApiService: CollectionsApiService,
    private productApiService: ProductsApiService,
  ){}

  collectionCardData!: CollectionCardData;

  ngOnInit(){
    const collectionId = Number(this.route.snapshot.paramMap.get('collectionId'));

    this.getCollectionData(collectionId);
  }

  getCollectionData(collectionId: number){
    this.collectionApiService.getCollectionById(collectionId).subscribe({
      next: (data) => {
        this.collectionCardData = data as CollectionCardData;
        this.fetchCollectionProducts();
      },
      error : (error) => {
        console.error(error);
      }
    });
  }

  fetchCollectionProducts(){
    this.collectionCardData.productsList.forEach(productId => {
      this.productApiService.getProductById(productId).subscribe({
        next: (data) => {
          this.collectionProducts.push(data as ProductCardData);
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

}
