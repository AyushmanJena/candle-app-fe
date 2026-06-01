import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Sort, MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, NgIf } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminProductDetails, AdminProductsList, ImageUrl } from '../../interfaces/products-admin.interface';
import { ProductsManagementService } from '../../services/products-management.service';

@Component({
  selector: 'app-admin-products',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    NgIf,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'title', 'discountedPrice', 'inStock', 'actions'];
  productsList: AdminProductsList[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editDialogShown: boolean = false;
  editDialogData!: AdminProductDetails;
  dialogMode: 'create' | 'edit' = 'edit';

  dataSource = new MatTableDataSource<AdminProductsList>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  editForm!: FormGroup;

  constructor(
    private productsManagementService: ProductsManagementService,
  ) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      'productId': new FormControl(1), // dummy data
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'originalPrice': new FormControl(null),
      'discountedPrice': new FormControl(null, Validators.required),
      'quantityAvailable': new FormControl(null, Validators.required),
      'similarProductIds': new FormControl(null),
      'imageUrls': new FormArray([this.newImageUrlGroup()]),
    });

    this.fetchProductsList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  fetchProductsList() {
    this.productsManagementService.getAllProducts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.productsList = data;
      },
      error: (error) => {
        console.error("Could not fetch products list", error);
      }
    })
  }

  displayEditDialog(id?: number) {
    if (!id) return;
    this.dialogMode = 'edit';
    this.editDialogShown = true;
    // editDialogData would be fetched from an API call using productId

    this.productsManagementService.getProductDetailsById(id).subscribe({
      next: (data) => {
        this.editDialogData = data;

        this.editForm.patchValue({
          productId: data.productId,
          title: data.title,
          description: data.description,
          originalPrice: data.originalPrice,
          discountedPrice: data.discountedPrice,
          quantityAvailable: data.quantityAvailable,
          similarProductIds: data.similarProductIds,
          imageUrls: null
        });

        this.imageUrlsArray.clear();
        const images: ImageUrl[] = data.imageUrl ?? [];
        if (images.length === 0) {
          this.imageUrlsArray.push(this.newImageUrlGroup());
        } else {
          images.forEach(image => this.imageUrlsArray.push(this.newImageUrlGroup(image)));
        }
      },
      error: (error) => {
        console.error("Could not fetch product details", error);
      }
    });
  }

  displayCreateDialog() {
    this.dialogMode = 'create';
    this.editDialogShown = true;
    this.editForm.reset();

    this.imageUrlsArray.clear();
    this.imageUrlsArray.push(this.newImageUrlGroup());
  }

  onEditDialogClose() {
    this.editDialogShown = false;
  }

  saveProductData() {
    if (this.editForm.invalid) return;

    if (this.dialogMode === 'create') {
      this.createProduct();
    } else {
      this.updateProductData();
    }
  }

  createProduct() {
    this.productsManagementService.createProduct(this.editForm.value).subscribe({
      next: () => {
        this.onEditDialogClose();
        this.fetchProductsList();
      },
      error: (err) => console.error('Failed to create product', err)
    });
  }


  updateProductData() {
    if (this.editForm.invalid) return;

    const productId = this.editForm.value.productId;

    this.productsManagementService.updateProduct(productId, this.editForm.value).subscribe({
      next: () => {
        this.onEditDialogClose();
        this.fetchProductsList();
      },
      error: (err) => console.error('Failed to update product', err)
    });

  }


  // image url helpers
  get imageUrlsArray(): FormArray {
    return this.editForm.get('imageUrls') as FormArray;
  }

  newImageUrlGroup(image?: ImageUrl): FormGroup {
    return new FormGroup({
      imageId: new FormControl(image?.imageId ?? null),
      displayOrder: new FormControl(image?.displayOrder ?? 0),
      imageUrl: new FormControl(image?.imageUrl ?? '', Validators.pattern('https?://.+'))
    });
  }

  addImageUrlField() {
    this.imageUrlsArray.push(
      this.newImageUrlGroup({ imageId: 0, displayOrder: this.imageUrlsArray.length, imageUrl: '' })
    );
  }

  removeImageUrlField(index: number) {
    if (this.imageUrlsArray.length > 1) {
      this.imageUrlsArray.removeAt(index);
      this.imageUrlsArray.controls.forEach((control, i) => {
        control.get('displayOrder')?.setValue(i);
      });
    }
  }
}

