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
    MatHeaderCellDef,
    MatCardModule,
    CommonModule
],
  templateUrl: './admin-coupons.component.html',
  styleUrl: './admin-coupons.component.css'
})
export class AdminCouponsComponent implements OnInit {
  displayedColumns: string[] = ['couponId', 'couponCode', 'discountPercentage', 'minimumPurchase', 'actions'];
  ordersLists: CouponsList[] = [
    {couponId:1, couponCode: "VULCAN24", discountPercentage:24, minimumPurchase:500, activeStatus:true },
    {couponId:2, couponCode: "AYUSH12", discountPercentage:12, activeStatus:false },
    {couponId:3, couponCode: "SUMEEN22", discountPercentage:22, minimumPurchase: 1000, activeStatus:true },
  ];

  dataSource = new MatTableDataSource(this.ordersLists);

   addForm!: FormGroup;
   addDialogShown: boolean = false;

  ngOnInit(){
    this.addForm = new FormGroup({
      'couponCode': new FormControl(null, Validators.required),
      'discount': new FormControl(null, Validators.required),
      'minimumPurchase': new FormControl(null),
    });
  }

  changeCouponStatus(couponCode: number){
    // make api call to change the order status
    // set the order status of the order to the selected option
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

  }
}


export interface CouponsList{
  couponId: number;
  couponCode: string;
  discountPercentage: number;
  minimumPurchase?: number;
  activeStatus: boolean;
}
