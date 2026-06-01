import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CollectionsList } from '../../interfaces/collections.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CollectionsManagementService } from '../../services/collections-management.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AdminProductsList } from '../../interfaces/products-admin.interface';
import { ProductsManagementService } from '../../services/products-management.service';

@Component({
  selector: 'app-admin-collections',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './admin-collections.component.html',
  styleUrl: './admin-collections.component.css'
})
export class AdminCollectionsComponent {
  displayedColumns: string[] = ['collectionId', 'title', 'productsList', 'actions'];

  dataSource = new MatTableDataSource<CollectionsList>([]);

   addForm!: FormGroup;
   addDialogShown: boolean = false;
   dialogMode: 'create' | 'edit' = 'create';

   @ViewChild(MatSort) sort! : MatSort;

   allProductsList: AdminProductsList[] = [];

   constructor(
    private collectionsManagementService: CollectionsManagementService,
    private productsManagementService: ProductsManagementService,
   ){}

  ngOnInit(){
    this.addForm = new FormGroup({
      'collectionId': new FormControl(null),
      'title': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required),
      'productsList': new FormControl(null),
    });

    this.fetchCollectionsList();
    this.fetchAllProductsList();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.sort.sort({ id: 'collectionId', start: 'asc', disableClear: false });  // default sort
  }

  fetchCollectionsList(){
    this.collectionsManagementService.getAllCollections().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      },
      error : (error) => {
        console.error("Error fetching collections list", error);
      }
    })
  }

  fetchAllProductsList(){
    this.productsManagementService.getAllProducts().subscribe({
      next: (data)=> {
        this.allProductsList = data;
      },
      error: (error) => {
        console.error("Error fetching products list", error);
      }
    });
  }

  displayAddDialog(){
    this.dialogMode = 'create';
    this.addDialogShown = true;
    this.addForm.reset();
  }

  displayEditDialog(collectionId: number){
    if(!collectionId) return;

    this.dialogMode = 'edit';
    this.addDialogShown = true;

    this.collectionsManagementService.getCollectionDetailsById(collectionId).subscribe({
      next: (data) => {
        console.log("id : ", collectionId);
        this.addForm.patchValue({
          collectionId: collectionId,
          title: data.title,
          imageUrl: data.imageUrl,
          productsList: data.productsList
        });
      },
      error: (error) => {
        console.error("Error fetching collection details", error);
      }
    });
  }

  saveCollectionData(){
    if(this.addForm.invalid) return;

    if(this.dialogMode === 'create'){
      this.saveCollection();
    }
    else{
      this.updateCollectionData();
    }
  }

  onAddDialogClose(){
    this.addDialogShown = false;
     this.addForm.reset();
  }

  saveCollection(){
    if(this.addForm.invalid) return;

    this.collectionsManagementService.createCollection(this.addForm.value).subscribe({
      next: ()=> {
        this.fetchCollectionsList();
        this.onAddDialogClose();
      },
      error : (error) => {
        console.error("Error creating collection", error);
      }
    })
  }

  updateCollectionData(){
    if(this.addForm.invalid) return;

    const productId = this.addForm.value.collectionId;

    this.collectionsManagementService.updateCollection(productId, this.addForm.value).subscribe({
      next: () => {
        this.onAddDialogClose();
        this.fetchCollectionsList();
      },
      error : (error) => {
        console.error("Error updating collection", error);
      }
    })
  }

  deleteCollection(collectionId: number){
    if(!collectionId) return;

    this.collectionsManagementService.deleteCollection(collectionId).subscribe({
      next: () => {
        this.fetchCollectionsList();
      },
      error: (error) => {
        console.error("Error deleting collection", error);
      }
    });
  }
}

