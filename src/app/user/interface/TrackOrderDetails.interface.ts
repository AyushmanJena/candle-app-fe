
export interface OrderDetailsResponse{
  orderId: number;
  orderStatus: DeliveryStatus;
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

  items: Items[];
}

export interface Items{
  itemId: number;
  productId: number;
  quantity: number;
}

export interface OrderProducts{ // same as CartProduct but created new interface to avoid confusion
  productId: number;
  title: string;
  imageUrl: string;
  originalPrice?: number;
  discountedPrice: number;
  quantity: number;
}
 
export type DeliveryStatus = 'PLACED' | 'PENDING' | 'ACCEPTED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface DeliveryStep {
  key: DeliveryStatus;
  label: string;
  icon: string;
}

