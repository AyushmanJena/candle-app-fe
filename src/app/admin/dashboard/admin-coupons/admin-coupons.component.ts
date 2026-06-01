import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { CouponsList } from '../../interfaces/coupons.interface';
import { CouponsManagementService } from '../../services/coupons-management.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-coupons',
  imports: [
    ReactiveFormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatSort,
    MatHeaderCellDef,
    MatCardModule,
    CommonModule
],
  templateUrl: './admin-coupons.component.html',
  styleUrl: './admin-coupons.component.css'
})
export class AdminCouponsComponent implements OnInit {
  displayedColumns: string[] = ['couponId', 'couponCode', 'discountPercentage', 'minimumPurchase', 'actions'];

  dataSource = new MatTableDataSource<CouponsList>([]);

   addForm!: FormGroup;
   addDialogShown: boolean = false;

   @ViewChild(MatSort) sort! : MatSort;

   constructor(
    private couponsManagementService: CouponsManagementService,
   ){}

  ngOnInit(){
    this.addForm = new FormGroup({
      'couponCode': new FormControl(null, Validators.required),
      'discountPercentage': new FormControl(null, Validators.required),
      'minimumPurchase': new FormControl(null),
    });

    this.fetchCouponsList();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.sort.sort({ id: 'couponId', start: 'asc', disableClear: false });  // default sort
  }

  fetchCouponsList(){
    this.couponsManagementService.getAllCoupons().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      },
      error : (error) => {
        console.error("Error fetching coupons list", error);
      }
    })
  }

  changeCouponStatus(couponId: number){
    this.couponsManagementService.changeCouponStatus(couponId).subscribe({
      next: (data) =>{
        this.fetchCouponsList();
      }
    });
  }

  deleteCoupon(couponId: number){
    console.log("deleted")
  }


  displayAddDialog(){
    this.addDialogShown = true;
  }

  onAddDialogClose(){
    this.addDialogShown = false;
     this.addForm.reset();
  }


  saveCouponData(){
    if(this.addForm.invalid) return;

    this.couponsManagementService.createCoupon(this.addForm.value).subscribe({
      next: ()=> {
        this.fetchCouponsList();
        this.onAddDialogClose();
      },
      error : (error) => {
        console.error("Error creating coupon", error);
      }
    })
  }
}


