import {EventEmitter, Injectable, Output} from '@angular/core';
import {OrderItem} from "../domain/OrderItem";
import {Product} from "../domain/Product";
import {Order} from "../domain/Order";
import {Observable} from "rxjs";
import {BASE_URL} from "../config/constants";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Output() cartCount = new EventEmitter<number>();
  constructor(private http: HttpClient) { }

  addItem(item: OrderItem) {
    let cartItems = this.getItems()
    if(!cartItems) {
      localStorage.setItem('my-cart', JSON.stringify([item]))
      this.cartCount.emit(1)
    } else {
      let existing = cartItems.filter(cItem => cItem.product.id == item.product.id)
      if(existing && existing.length>0) {
        existing[0].quantity++
      } else {
        cartItems.push(item)
        this.cartCount.emit(cartItems.length)
      }
      localStorage.setItem('my-cart', JSON.stringify(cartItems))
    }
  }

  getItemCount(): number {
    const cartItems = localStorage.getItem('my-cart')
    if(cartItems)
      return JSON.parse(cartItems as string).length
    return 0
  }

  getItems(): OrderItem[] {
    let cartItems = localStorage.getItem('my-cart')
    if(cartItems)
      return JSON.parse(cartItems as string)
    return []
  }

  removeItem(product: Product): OrderItem[] {
    let cartItems = this.getItems()
    if(cartItems)
      cartItems.splice(cartItems.findIndex((element:  OrderItem) => element.product.id === product.id),1);
      localStorage.setItem('my-cart', JSON.stringify(cartItems))
      this.cartCount.emit(cartItems.length)
      return cartItems
    return []
  }

  emptyCart() {
    localStorage.removeItem('my-cart')
    this.cartCount.emit(0)
  }

  checkout(order: Order): Observable<HttpResponse<Order>> {
    return this.http
      .post<Order>(`${BASE_URL}/orders`, order, {observe: 'response'})
  }
}
