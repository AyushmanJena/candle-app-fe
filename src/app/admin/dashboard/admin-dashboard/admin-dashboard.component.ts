import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HomepageManagementService } from '../../services/homepage-management.service';
import { CollectionsManagementService } from '../../services/collections-management.service';
import { ProductsManagementService } from '../../services/products-management.service';
import { AdminProductsList } from '../../interfaces/products-admin.interface';
import { CollectionsList } from '../../interfaces/collections.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-admin-dashboard',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  editDialogShown: boolean = true;
  addForm!: FormGroup;

  allProductsList: AdminProductsList[] = [];
  allCollectionsList: CollectionsList[] = [];

  constructor(
    private homepageManagementService: HomepageManagementService,
    private collectionsManagementService: CollectionsManagementService,
    private productsManagementService: ProductsManagementService,
  ) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      bannerImageUrls: new FormArray([new FormControl('')]),
      'featuredCollections': new FormControl(null),
      'bestSellers': new FormControl(null),
      reviews: new FormArray([new FormControl('')]),
    });

    this.fetchHomepageData();
    this.fetchCollectionsList();
    this.fetchAllProductsList();
  }


  onEditDialogClose() {
    this.editDialogShown = false;
  }

  fetchHomepageData() {
    this.homepageManagementService.getHomepageData().subscribe({
      next: (data) => {
        this.patchFormArray(this.bannerImageUrlsArray, data.bannerImageUrls);
        this.patchFormArray(this.reviewsArray, data.reviews);
        this.addForm.patchValue({
          featuredCollections: data.featuredCollections,
          bestSellers: data.bestSellers,
        });
      },
      error: (error) => {
        console.error("Error fetching homepage data : ", error);
      }
    });
  }

  fetchCollectionsList() {
    this.collectionsManagementService.getAllCollections().subscribe({
      next: (data) => {
        this.allCollectionsList = data;
      },
      error: (error) => {
        console.error("Error fetching collections list : ", error);
      }
    });
  }

  fetchAllProductsList() {
    this.productsManagementService.getAllProducts().subscribe({
      next: (data) => {
        this.allProductsList = data;
      },
      error: (error) => {
        console.error("Error fetching products list : ", error);
      }
    });
  }

  saveHomepageData() {
    if (this.addForm.invalid) return;

    this.homepageManagementService.updateHomepageData(this.addForm.value).subscribe({
      next: () => this.onEditDialogClose(),
      error: (error) => console.error('Error saving homepage data:', error),
    });
  }


  get bannerImageUrlsArray(): FormArray {
    return this.addForm.get('bannerImageUrls') as FormArray;
  }

  get reviewsArray(): FormArray {
    return this.addForm.get('reviews') as FormArray;
  }

  addBannerUrl() { this.bannerImageUrlsArray.push(new FormControl('')); }
  removeBannerUrl(i: number) { if (this.bannerImageUrlsArray.length > 1) this.bannerImageUrlsArray.removeAt(i); }

  addReview() { this.reviewsArray.push(new FormControl('')); }
  removeReview(i: number) { if (this.reviewsArray.length > 1) this.reviewsArray.removeAt(i); }

  asFormControl(ctrl: AbstractControl): FormControl {
    return ctrl as FormControl;
  }

  private patchFormArray(array: FormArray, values: string[]) {
    array.clear();
    (values?.length ? values : ['']).forEach(v => array.push(new FormControl(v)));
  }
}
