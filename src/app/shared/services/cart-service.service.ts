import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private STORAGE_KEY = 'cartItems';
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartItems();
   }

  private loadCartItems(){
    const data = localStorage.getItem(this.STORAGE_KEY);
    const items: CartItem[] = data ? JSON.parse(data) : [];
    this.cartItemsSubject.next(items);
  }

  private saveCart() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItemsSubject.value));
  }

  private setCartItems(items: CartItem[]) {
    this.cartItemsSubject.next(items);
    this.saveCart();
  }
  

  addToCart(productId: number){
    const cartItems = [...this.cartItemsSubject.value];

    if(cartItems.some(item => item.productId === productId)){
      const itemIndex = cartItems.findIndex(item => item.productId === productId);
      cartItems[itemIndex] = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + 1
      };
    } else  {
      cartItems.push({productId, quantity: 1});
    }
    this.setCartItems(cartItems);
  }

  removeFromCart(productId: number){
    const cartItems = [...this.cartItemsSubject.value];
    const itemIndex = cartItems.findIndex(item => item.productId === productId);

    if(itemIndex === -1){
      return;
    }

    if(cartItems[itemIndex].quantity > 1){
      cartItems[itemIndex] = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity - 1
      };
    } else {
      cartItems.splice(itemIndex, 1);
    }

    this.setCartItems(cartItems);
  }

  getCartItems(){
    return [...this.cartItemsSubject.value];
  }

  getCartItemQuantityById(productId: number){
    return this.cartItemsSubject.value.find(item => item.productId === productId)?.quantity || 0;
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  
}

export interface CartItem{
  productId: number;
  quantity: number;
}
