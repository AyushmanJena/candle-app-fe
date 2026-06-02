import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from '../../homepage/product-card/product-card.component';
import {NgForOf} from '@angular/common';
import {CollectionCardData} from '../../../products.interface';
import {Router} from '@angular/router';
import { CollectionsApiService } from '../../services/collections-api.service';

@Component({
  selector: 'app-collections-main-content',
  imports: [
    NgForOf
  ],
  templateUrl: './collections-main-content.component.html',
  styleUrl: './collections-main-content.component.css'
})
export class CollectionsMainContentComponent implements OnInit{
  collectionCardsList : CollectionCardData[] = [];

  constructor(
    private router: Router,
    private collectionsApiService: CollectionsApiService,
  ) {
  }

  ngOnInit(){
    this.getCollectionsData();
  }

  getCollectionsData(){
    this.collectionsApiService.getAllCollections().subscribe({
      next: (data) => {
        this.collectionCardsList = data as CollectionCardData[];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  navigateToCollectionDetails(id: number){
    this.router.navigate(['collections/'+id]);
  }
}
