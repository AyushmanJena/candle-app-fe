export interface ProductCardData{
  productId: number;
  title: string;
  imageUrl: string;
  description: string;
  discountedPrice: number;
  originalPrice: number;
  inStock: boolean;
}

export interface CollectionCardData{
  title: string;
  imageUrl: string;
  url: string;
}

export interface ProductDetails{
  productId: number;
  title: string;
  imageUrl:  string[];
  description: string;
  discountedPrice: number;
  originalPrice: number;
  similarProductIds: number[];
}

export interface CollectionList{
  collectionId: number;
  collectionTitle: string;
  productsList: Array<ProductCardData>;
}
