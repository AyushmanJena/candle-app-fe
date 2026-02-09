import {Component, HostListener} from '@angular/core';
import {ProductCardComponent} from '../homepage/product-card/product-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {ProductCardData} from '../../products.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-listing-page',
  imports: [
    ProductCardComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css'
})
export class ListingPageComponent {

  appliedFilters: string[] = [];

  showFiltersPopup: boolean = false;

  filters = {
    priceMin: null,
    priceMax: null,
    quantity: null,
    availability: 'all'
  };

  toggleFiltersPopup() {
    this.showFiltersPopup = !this.showFiltersPopup;
  }

  closeFiltersPopup() {
    this.showFiltersPopup = false;
  }

  applyFilters() {
    this.appliedFilters = [];

    if (this.filters.priceMin !== null || this.filters.priceMax !== null)
      this.appliedFilters.push(`₹${this.filters.priceMin || 0} - ₹${this.filters.priceMax || '∞'}`);

    if (this.filters.quantity !== null)
      this.appliedFilters.push(`Qty ≥ ${this.filters.quantity}`);

    if (this.filters.availability !== 'all')
      this.appliedFilters.push(
        this.filters.availability === 'instock' ? 'In Stock' : 'Out of Stock'
      );

    this.closeFiltersPopup();

    // filter logic on productsList goes here
    this.filterProducts();
  }

  filterProducts() {
    console.log('Filters Applied:', this.filters);

    // TODO: Apply filtering on productsList based on filter values
  }

  // when clicked outside, close popup
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;

    const clickedInsidePopup = target.closest('#filters-popup') !== null;
    const clickedFilterButton = target.closest('#filters-btn') !== null;

    if (!clickedInsidePopup && !clickedFilterButton) {
      this.showFiltersPopup = false;
    }
  }



  productsList: ProductCardData[] = [
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
    },
    {
      productId:2,
      title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
      imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
      description: "hello this is test description",
      discountedPrice: 99,
      originalPrice: 99,
    },
  ]
}
