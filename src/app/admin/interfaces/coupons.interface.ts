export interface CouponsList{
  couponId: number;
  couponCode: string;
  discountPercentage: number;
  minimumPurchase?: number;
  activeStatus: boolean;
}

export interface CouponRequest{
  couponCode: string;
  discountPercentage: number;
  minimumPurchase?: number;
  activeStatus: boolean; // true by default
}