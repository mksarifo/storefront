import {Component, Input} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../domain/Product";
import {OrderItem} from "../../domain/OrderItem";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: any
  quantity = 1
  constructor(private cartService: CartService) {
  }
  addToCart(product: Product) {
    this.cartService.addItem(new OrderItem(0, this.quantity, product))
    alert(`${product.name} added to cart`)
  }
}
