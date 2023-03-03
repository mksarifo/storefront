import { Component } from '@angular/core';
import {Billing} from "../../domain/Billing";
import {CartService} from "../../services/cart.service";
import {Product} from "../../domain/Product";
import {Items, Order} from "../../domain/Order";
import {OrderItem} from "../../domain/OrderItem";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

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
  orderId: number | undefined = 0

  confirmed = false

  get form(): { [key: string]: AbstractControl; }
  {
    return this.cartForm.controls;
  }

  cartForm = new FormGroup({
    fullName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(254)],
    }),
    creditCard: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(16), Validators.maxLength(19)],
    }),
  });


  items: OrderItem[] = this.cartService.getItems()

  ngOnInit() {
    this.calculateTotal()
  }

  checkout(): void {
    const {fullName, address, creditCard} = this.cartForm.getRawValue();
    this.billing.fullName = fullName
    this.billing.address = address
    this.billing.creditCardNumber = creditCard as unknown as number
    let cartItems: Items[] = []
    for (const item of this.items) {
      cartItems.push(
        {
          quantity: item.quantity,
          product_id: item.product.id
        }
      )
    }
    const order = new Order(cartItems, this.billing)

    this.cartService.checkout(order).subscribe((result) => {
      this.orderId = result.body?.id
      this.billing = {
        fullName: "",
        address: "",
        creditCardNumber: 0
      }
      this.confirmed = true
      this.cartService.emptyCart()
    })
  }

  remove(product: Product) {
    this.items = this.cartService.removeItem(product)
    this.calculateTotal()
  }

  calculateTotal(e?: any, cartItem?: OrderItem) {
    if(e && cartItem) {
      cartItem.quantity = e
    }
    this.total = 0
    for (const item of this.items) {
      if(item.quantity > 0)
        this.total += item.quantity * item.product.price
    }
  }
}
