import { Component } from '@angular/core';
import {Billing} from "../../domain/Billing";
import {CartService} from "../../services/cart.service";
import {Product} from "../../domain/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private cartService: CartService) {
  }

  billing: Billing = {
    fullName: "",
    address: "",
    creditCardNumber: 0
  }

  total: number = 0

  confirmed = false


  items = this.cartService.getItems()

  ngOnInit() {
    for (const item of this.items) {
      this.total += item.product.price
    }
  }

  checkout(): void {
    // checkout API TODO
    console.log(this.billing)

    // Reset form
    this.billing = {
      fullName: "",
      address: "",
      creditCardNumber: 0
    }

    this.confirmed = true
  }

  remove(product: Product) {
    //this.items.splice(this.items.findIndex(element => element.product === product),1);
    this.items = this.cartService.removeItem(product)
  }
}
