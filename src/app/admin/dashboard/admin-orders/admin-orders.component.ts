import {Component, inject, ViewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortHeader, MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  displayedColumns: string[] = ['orderId', 'customerName', 'customerPhone', 'customerPinCode', 'orderAmount', 'orderItems', 'actions'];
  ordersLists: OrdersList[] = [
    {orderId: 1, customerName: "Sai", customerPhone: 1234567890, customerPinCode: 75001, orderAmount:200, orderItems:3, orderStatus:"placed"},
    {orderId: 2, customerName: "Slayass", customerPhone: 1234567890, customerPinCode: 75022, orderAmount:300, orderItems:2, orderStatus:"placed"},
    {orderId: 3, customerName: "Sudha", customerPhone: 1234567890, customerPinCode: 75001, orderAmount:250, orderItems:1, orderStatus:"delivered"},
    {orderId: 4, customerName: "Ayush", customerPhone: 1234567890, customerPinCode: 75001, orderAmount:2000, orderItems:10, orderStatus:"shipped"},
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedViewDetailsOrder!: OrdersList;
  displayOrderDetails: boolean = false;


  dataSource = new MatTableDataSource(this.ordersLists);

  private _liveAnnouncer = inject(LiveAnnouncer);


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

  displayOrderDetailsDialog(orderId: number){
    // make api call to fetch complete order detail
    this.selectedViewDetailsOrder = {orderId: 1, customerName: "Sai", customerPhone: 1234567890, customerPinCode: 75001, orderAmount:200, orderItems:3, orderStatus:"placed"}
    this.displayOrderDetails = true;
  }

  changeOrderStatus(orderId: number){
    // make api call to change the order status
    // set the order status of the order to the selected option
  }

  onEditDialogClose(){
    this.displayOrderDetails = false;
  }


}

export interface OrdersList{
  orderId: number;
  customerName: string;
  customerPhone: number;
  customerPinCode: number;
  orderItems: number;
  orderAmount: number;
  orderStatus: string;


  // this will be imported and used by Checkout page as well
  // do not fetch all the details in the list instead fetch only on clicking view Action button
  // completeCustomerDetails: CheckOutModel;
  // orderList: ProductsList[];

}

export interface CheckOutModel {
  customerEmail: string;
}
