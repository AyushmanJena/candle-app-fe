import { Component } from '@angular/core';
import {HeroSectionComponent} from '../homepage/hero-section/hero-section.component';
import {NgForOf} from '@angular/common';
import {ProductCardComponent} from '../homepage/product-card/product-card.component';
import {CollectionList, ProductCardData} from '../../products.interface';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-collections',
  imports: [
    HeroSectionComponent,
    NgForOf,
    ProductCardComponent,
    RouterOutlet
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {

  collectionsList: CollectionList[] = [

    {collectionId: 1, collectionTitle:"Gift Sets",  productsList:[
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
      ]},

    {collectionId: 2, collectionTitle:"Valentines Special",  productsList:[
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
        },
      ]},
  ]


}


