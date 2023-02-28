import { Component } from '@angular/core';
import {CartService} from "./services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private cartService: CartService) {
  }

  title = 'my_store';

  cartCount = this.cartService.getItemCount()
  ngOnInit() {
    this.cartService.cartCount.subscribe(value => this.cartCount=value)
  }
}
