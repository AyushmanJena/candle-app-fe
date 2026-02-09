import {Component, Input} from '@angular/core';
import {CollectionCardData} from '../../../products.interface';

@Component({
  selector: 'app-collection-card',
  imports: [],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.css'
})
export class CollectionCardComponent {
  @Input()
  collectionData!: CollectionCardData;
}

