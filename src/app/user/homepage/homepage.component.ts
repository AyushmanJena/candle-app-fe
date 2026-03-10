import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HeroSectionComponent} from './hero-section/hero-section.component';
import {CollectionCardComponent} from '../collections/collection-card/collection-card.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {NgForOf} from '@angular/common';
import {CollectionCardData, ProductCardData} from '../../products.interface';

@Component({
  selector: 'app-homepage',
  imports: [
    HeroSectionComponent,
    CollectionCardComponent,
    ProductCardComponent,
    NgForOf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router: Router) {
  }

  collectionsList: CollectionCardData[] = [
    {title: "Gift Sets", imageUrl: "/collection/collection-01.jpg", url:"gift-sets"},
    {title: "Premium Candles", imageUrl: "/collection/collection-02.jpg", url: "premium-candles"},
    {title: "Waterproof Candles", imageUrl: "/collection/collection-03.jpg", url: "waterproof-candles"},
  ];

  bestSellersList: ProductCardData[] = [
    {
      productId:1,
      title: "Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 120,
        inStock: true
    },
    {
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
        inStock: true
    },
    {
      productId:3,
      title: "Third Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 120,
        inStock: true
    }
  ]
}
