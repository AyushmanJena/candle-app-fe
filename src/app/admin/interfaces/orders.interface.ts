export interface OrderDetailsResponse{
    orderId: number;
    orderStatus: string;
    expectedDelivery: string;
    subTotal: number;
    deliveryCharge: number;
    grandTotal: number;
    couponAmount? : number;
    couponCode? : string;
    customerName: string;
    deliveryAddress: string;
    phoneNumber: string;
    emailAddress: string;
    paymentMethod: string;
    items: OrderProductResponse[];
}

export interface OrderProductResponse{
    itemId: number;
    productId: number;
    quantity: number;
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
