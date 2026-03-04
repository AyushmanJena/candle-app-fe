import { Component } from '@angular/core';
import {ProductCardData} from '../../../products.interface';
import {NgForOf} from '@angular/common';
import {ProductCardComponent} from '../../homepage/product-card/product-card.component';

@Component({
  selector: 'app-collection-detail',
  imports: [
    NgForOf,
    ProductCardComponent
  ],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.css'
})
export class CollectionDetailComponent {
  bestSellersList: ProductCardData[] = [
    {
      productId:1,
      title: "Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 120,
    },
    {
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },
    {
      productId:3,
      title: "Third Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 120,
    },
    {
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },
    {
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },
    {
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },{
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },{
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },{
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    }





  ]
}
