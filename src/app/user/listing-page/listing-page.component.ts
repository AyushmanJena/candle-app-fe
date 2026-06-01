import { Component, HostListener, OnInit } from '@angular/core';
import { ProductCardComponent } from '../homepage/product-card/product-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { ProductCardData } from '../../products.interface';
import { FormsModule } from '@angular/forms';
import {ProductsApiService} from '../services/products-api.service';

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
export class ListingPageComponent implements OnInit {

  productsList!: ProductCardData[];
  filteredProductsList!: ProductCardData[];

  showFiltersPopup: boolean = false;
  appliedFilters: string[] = [];
  searchText: string = '';

  filters = {
    priceMin: null,
    priceMax: null,
    availability: 'all'
  };

  constructor(
    private productsApiService: ProductsApiService,
  ) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {

    // call service method to load all products
    this.productsApiService.getAllProducts().subscribe({
      next: (data) => {
        this.productsList = data;
        this.filteredProductsList = [...this.productsList];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toggleFiltersPopup() {
    this.showFiltersPopup = !this.showFiltersPopup;
  }

  closeFiltersPopup() {
    this.showFiltersPopup = false;
  }

  applyFilters() {
    this.appliedFilters = [];

    if (this.filters.priceMin !== null || this.filters.priceMax !== null)
      this.appliedFilters.push(`₹${this.filters.priceMin || 0} - ₹${this.filters.priceMax || 'max'}`);

    if (this.filters.availability !== 'all')
      this.appliedFilters.push(
        this.filters.availability === 'instock' ? 'In Stock' : 'Out of Stock'
      );

    this.closeFiltersPopup();

    this.filterProducts();
  }

  removeFilter(filter: string) {

    if (filter.includes('₹')) {
      this.filters.priceMin = null;
      this.filters.priceMax = null;
    }

    if (filter === 'In Stock' || filter === 'Out of Stock') {
      this.filters.availability = 'all';
    }

    this.appliedFilters = this.appliedFilters.filter(f => f !== filter);

    this.filterProducts();
  }

  filterProducts() {

  const search = this.searchText.toLowerCase().trim();

  this.filteredProductsList = this.productsList.filter(product => {

    const price = product.discountedPrice;

    const minOk =
      this.filters.priceMin == null || price >= this.filters.priceMin;

    const maxOk =
      this.filters.priceMax == null || price <= this.filters.priceMax;

    const availabilityOk =
      this.filters.availability === 'all' ||
      (this.filters.availability === 'instock' && product.inStock) ||
      (this.filters.availability === 'outofstock' && !product.inStock);

    const searchOk =
      search === '' ||
      product.title.toLowerCase().includes(search);

    return minOk && maxOk && availabilityOk && searchOk;

  });

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

}
