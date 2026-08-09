import { Component } from '@angular/core';
import {HeroSectionComponent} from '../homepage/hero-section/hero-section.component';
import {NgForOf} from '@angular/common';
import {ProductCardComponent} from '../homepage/product-card/product-card.component';
import {CollectionList, ProductCardData} from '../../products.interface';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-collections',
  imports: [
    RouterOutlet
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {

}


