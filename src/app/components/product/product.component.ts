import {Component, Input, ViewChild} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../domain/Product";
import {OrderItem} from "../../domain/OrderItem";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

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

  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;

  addToCart(product: Product) {
    this.cartService.addItem(new OrderItem(0, this.quantity, product))
    this.successSwal.fire()
  }
}
