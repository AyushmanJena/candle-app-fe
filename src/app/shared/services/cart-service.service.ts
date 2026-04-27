import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private STORAGE_KEY = 'cartItems';
  cartItems: CartItem[] =[];

  constructor() {
    this.loadCartItems();
   }

  private loadCartItems(){
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.cartItems = data ? JSON.parse(data) : []; 
  }

  private saveCart() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems));
  }
  

  addToCart(productId: number){
    if(this.cartItems.some(item => item.productId === productId)){
      const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
      this.cartItems[itemIndex].quantity++;
    } else  {
      this.cartItems.push({productId, quantity: 1});
    }
    this.saveCart();
    // console.log(this.cartItems);
  }

  removeFromCart(productId: number){
    if(this.cartItems.some(item => item.productId === productId) && this.cartItems.find(item => item.productId === productId)?.quantity! > 1){
      const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
      this.cartItems[itemIndex].quantity--;
    } else if(this.cartItems.some(item => item.productId === productId) && this.cartItems.find(item => item.productId === productId)?.quantity! <= 1){
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    }
    this.saveCart();
    // console.log(this.cartItems);
  }

  getCartItems(){
    return this.cartItems;
  }

  getCartItemQuantityById(productId: number){
    return this.cartItems.find(item => item.productId === productId)?.quantity || 0;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }

  
}

export interface CartItem{
  productId: number;
  quantity: number;
}