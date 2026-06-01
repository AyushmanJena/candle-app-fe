export interface AdminProductsList{
  productId: number;
  title: string;
  originalPrice?: number;
  discountedPrice: number;
  inStock: boolean;
//   isShown: boolean;
}

export interface AdminProductDetails{
    productId: number;
    title: string;
    imageUrl: ImageUrl[];
    description: string;
    originalPrice? : number;
    discountedPrice: number;
    quantityAvailable: number;
    similarProductIds: number[];
}

export interface ImageUrl{
    displayOrder: number;
    imageId: number;
    imageUrl: string;
}


export interface AdminNewProductRequest{
    title: string;
    description: string;
    originalPrice? : number;
    discountedPrice: number;
    quantityAvailable: number;
    similarProductIds : number[];
    // images go with params imageUrls
}