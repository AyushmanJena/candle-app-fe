export interface CollectionsList{
    collectionId: number;
    imageUrl: string;
    title: string;
    productsList: number[];
    url: string;
} 

export interface CollectionRequest{
    imageUrl: string;
    title: string;
    productsList: number[];
    url: string;
}