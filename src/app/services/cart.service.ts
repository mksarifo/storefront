import { Injectable } from '@angular/core';
import {OrderItem} from "../domain/OrderItem";
import {Product} from "../domain/Product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addItem(item: OrderItem) {
    let cartItems = this.getItems()
    if(!cartItems) {
      localStorage.setItem('my-cart', JSON.stringify([item]))
    } else {
      let existing = cartItems.filter(cItem => cItem.product.id == item.product.id)
      if(existing && existing.length>0) {
        existing[0].quantity++
      } else {
        cartItems.push(item)
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
    let cartItems = localStorage.getItem('my-cart')
    let items
    if(cartItems && cartItems?.length > 0)
      items = JSON.parse(cartItems as string)
      items.splice(items.findIndex((element: { product: Product; }) => element.product === product),1);
      localStorage.setItem('my-cart', JSON.stringify(items))
      return items
    return []

  }
}
