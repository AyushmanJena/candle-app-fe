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
        console.log(data);
        this.productsList = data;
        this.filteredProductsList = [...this.productsList];
      },
      error: (error) => {
        console.error(error);
      }
    });

    // this.productsList = [
    //   {
    //     productId: 1,
    //     title: "Premium Scented Heart Shaped Candles with midnight autumn fragrance",
    //     imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
    //     description: "hello this is test description",
    //     discountedPrice: 99,
    //     originalPrice: 120,
    //     inStock: true
    //   },
    //   {
    //     productId: 2,
    //     title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance reyna",
    //     imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
    //     description: "hello this is test description",
    //     discountedPrice: 199,
    //     originalPrice: 99,
    //     inStock: true
    //   },
    //   {
    //     productId: 3,
    //     title: "Third Premium Scented Heart Shaped Candles with midnight autumn fragrance jett",
    //     imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
    //     description: "hello this is test description",
    //     discountedPrice: 299,
    //     originalPrice: 120,
    //     inStock: false
    //   },
    //   {
    //     productId: 4,
    //     title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance omen",
    //     imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
    //     description: "hello this is test description",
    //     discountedPrice: 399,
    //     originalPrice: 99,
    //     inStock: true
    //   },
    //   {
    //     productId: 5,
    //     title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
    //     imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
    //     description: "hello this is test description",
    //     discountedPrice: 499,
    //     originalPrice: 99,
    //     inStock: false
    //   },
    //   {
    //     productId: 6,
    //     title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
    //     imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
    //     description: "hello this is test description",
    //     discountedPrice: 599,
    //     originalPrice: 99,
    //     inStock: false
    //   },
    //   {
    //     productId: 7,
    //     title: "Second Premium Scented Heart Shaped Candles with midnight autumn fragrance",
    //     imageUrl: "https://i.pinimg.com/736x/f6/65/4d/f6654d653d8dabb78eacec645892b838.jpg",
    //     description: "hello this is test description",
    //     discountedPrice: 699,
    //     originalPrice: 99,
    //     inStock: true
    //   },
    // ];
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
      this.appliedFilters.push(`₹${this.filters.priceMin || 0} - ₹${this.filters.priceMax || '∞'}`);

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
