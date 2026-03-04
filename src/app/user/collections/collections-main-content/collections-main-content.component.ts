import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from '../../homepage/product-card/product-card.component';
import {NgForOf} from '@angular/common';
import {CollectionCardData} from '../../../products.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-collections-main-content',
  imports: [
    ProductCardComponent,
    NgForOf
  ],
  templateUrl: './collections-main-content.component.html',
  styleUrl: './collections-main-content.component.css'
})
export class CollectionsMainContentComponent implements OnInit{
  collectionCardsList : CollectionCardData[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(){
    this.collectionCardsList = [
      {title: "Gift Sets", imageUrl: "/collection/collection-01.jpg", url:"gift-sets"},
      {title: "Premium Candles", imageUrl: "/collection/collection-02.jpg", url: "premium-candles"},
      {title: "Waterproof Candles", imageUrl: "/collection/collection-03.jpg", url: "waterproof-candles"},
      {title: "Waterproof Candles", imageUrl: "/collection/collection-03.jpg", url: "waterproof-candles"},
    ]
  }

  navigateToCollectionDetails(url: string){
    this.router.navigate(['collections/'+url]);
  }
}
