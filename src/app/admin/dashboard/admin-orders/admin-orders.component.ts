import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortHeader, MatSortModule, Sort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatCardModule} from '@angular/material/card';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrdersManagementService } from '../../services/orders-management.service';
import { OrderDetails } from '../../../user/interface/TrackOrderDetails.interface';
import { OrderDetailsResponse } from '../../interfaces/orders.interface';

@Component({
  selector: 'app-admin-orders',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, NgIf, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'customerName', 'phoneNumber', 'orderAmount', 'orderItemsCount', 'actions'];
  // ordersLists: OrdersList[] = [
  //   {orderId: 1, customerName: "Sai", customerPhone: "1234567890",  orderAmount:200, orderItems:3, orderStatus:"placed"},
  //   {orderId: 2, customerName: "Slayass", customerPhone: "1234567890", orderAmount:300, orderItems:2, orderStatus:"placed"},
  //   {orderId: 3, customerName: "Sudha", customerPhone: "1234567890", orderAmount:250, orderItems:1, orderStatus:"delivered"},
  //   {orderId: 4, customerName: "Ayush", customerPhone: "1234567890", orderAmount:2000, orderItems:10, orderStatus:"shipped"},
  // ];

  ordersLists : OrdersList[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedViewDetailsOrder!: OrderDetailsResponse;
  displayOrderDetails: boolean = false;


  dataSource = new MatTableDataSource(this.ordersLists);

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(
    private ordersManagementService: OrdersManagementService,
  ){}

  ngOnInit(){
    this.ordersManagementService.getAllOrders().subscribe({
      next: (data) => {
        this.ordersLists = data;
        this.dataSource = new MatTableDataSource(this.ordersLists);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error : (error) => {
        console.error(error);
      }
    });
  }


  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  displayOrderDetailsDialog(orderId: number){
    // make api call to fetch complete order detail
    this.ordersManagementService.getOrderDetailsById(orderId).subscribe({
      next: (data) => {
        this.selectedViewDetailsOrder = data;
        this.displayOrderDetails = true;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  changeOrderStatus(orderId: number, newStatus: string){
   this.ordersManagementService.changeOrderStatus(orderId, newStatus)
    .subscribe({
      next: (res) => {
        console.log('Order status updated successfully', res);
      },
      error: (err) => {
        console.log('Error updating order status', err);
      }
    });
  }

  onEditDialogClose(){
    this.displayOrderDetails = false;
  }


}

export interface OrdersList{
  orderId: number;
  customerName: string;
  phoneNumber: string;
  // customerPinCode: number;
  orderItemsCount: number;
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
