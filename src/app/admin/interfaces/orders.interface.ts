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