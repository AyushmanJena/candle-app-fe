export interface CartProduct {
  productId: number;
  title: string;
  imageUrl: string;
  originalPrice?: number;
  discountedPrice: number;
  quantity: number;
}

export interface Coupon {
  couponCode: string;
  couponType: string; // percentage, amount
  couponValue: number; // 10%      , rupees 100
  discountAmount: number;
}
