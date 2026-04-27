import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCardModule} from '@angular/material/card';
import {Sort, MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'productTitle', 'finalPrice', 'stock', 'isShown', 'actions'];
  productsList: ProductsList[] = [
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 2, productTitle: "Candle 2", finalPrice: 99, originalPrice: 129, stock: 11, isShown: false},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
    {productId: 1, productTitle: "Candle 1", finalPrice: 110, originalPrice: 129, stock: 12, isShown: true},
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editDialogShown: boolean = false;
  editDialogData!: ProductsList;

  dataSource = new MatTableDataSource(this.productsList);

  private _liveAnnouncer = inject(LiveAnnouncer);

  editForm!: FormGroup;

  ngOnInit() {
    this.editForm = new FormGroup({
      'productId': new FormControl(1), // dummy data
      'title': new FormControl(null, Validators.required),
      'originalPrice': new FormControl(null),
      'finalPrice': new FormControl(null, Validators.required),
      'stock': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'imageUrls' : new FormControl(null)
    });
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

  displayEditDialog(id?: number){
    this.editDialogShown = true;
    // editDialogData would be fetched from an API call using productId
    this.editDialogData = {productId: 1, productTitle: "Candle 1", finalPrice: 99, originalPrice: 129, stock: 12, isShown: true}
  }

  onEditDialogClose(){
    this.editDialogShown = false;
  }

  saveProductData(){
    // make api call to update the data with its id from currentEditData
  }
}

export interface ProductsList{
  productId: number;
  productTitle: string;
  originalPrice?: number;
  finalPrice: number;
  stock: number;
  isShown: boolean;

  // in edit mode only
  description?: string;
  imageUrls?: string[];

}
