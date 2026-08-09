import { ProductCardData } from "./Product.interface";


export interface CollectionCardData{
  collectionId: number;
  title: string;
  imageUrl: string;
  url: string;
  productsList: number[];
}

export interface CollectionList{
  collectionId: number;
  collectionTitle: string;
  productsList: Array<ProductCardData>;
}
