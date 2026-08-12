import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import {CollectionCardData} from '../../interface/Collections.interface';

@Component({
  selector: 'app-collection-card',
  imports: [],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.css'
})
export class CollectionCardComponent {
  @Input()
  collectionData!: CollectionCardData;

  constructor(private router: Router) {}

  navigateToCollectionDetails() {
    this.router.navigateByUrl(this.collectionData.url);
  }
}

