import {Component, inject, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';

@Component({
  selector: 'app-admin-coupons',
  imports: [
    FormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './admin-coupons.component.html',
  styleUrl: './admin-coupons.component.css'
})
export class AdminCouponsComponent {
  displayedColumns: string[] = ['couponId', 'couponCode', 'discountPercentage', 'actions'];
  ordersLists: CouponsList[] = [
    {couponId:1, couponCode: "VULCAN24", discountPercentage:24, activeStatus:true },
    {couponId:2, couponCode: "AYUSH12", discountPercentage:12, activeStatus:false },
    {couponId:3, couponCode: "SUMEEN22", discountPercentage:22, activeStatus:true },
  ];

  dataSource = new MatTableDataSource(this.ordersLists);

  changeCouponStatus(couponCode: number){
    // make api call to change the order status
    // set the order status of the order to the selected option
  }

  deleteCoupon(couponId: number){
    console.log("deleted")
  }
}


export interface CouponsList{
  couponId: number;
  couponCode: string;
  discountPercentage: number;
  activeStatus: boolean;
}
