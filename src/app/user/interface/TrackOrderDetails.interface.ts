
export interface OrderDetails {
  orderId: number;
  orderStatus: DeliveryStatus;
  expectedDelivery: string;
  customerDetails: CustomerDetails;
  items: OrderProducts[];
  subTotal: number;
  deliveryCharge: number;
  grandTotal: number;
  couponAmount? : number;
  couponCode? : string;
}

export interface CustomerDetails{
  deliveryAddress: string;
  phoneNumber: string;
  emailAddress: string;
  paymentMethod: string;
}


export interface OrderProducts{ // same as CartProduct but created new interface to avoid confusion
  productId: number;
  title: string;
  imageUrl: string;
  originalPrice?: number;
  discountedPrice: number;
  quantity: number;
}

export type DeliveryStatus = 'order_placed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
 
export interface DeliveryStep {
  key: DeliveryStatus;
  label: string;
  icon: string;
}