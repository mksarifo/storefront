import { Component } from '@angular/core';
import {CartService} from "./services/cart.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private cartService: CartService, private authService: AuthService) {
  }

  title = 'my_store';

  cartCount = this.cartService.getItemCount()
  isLogged: boolean = false
  ngOnInit() {
    this.cartService.cartCount.subscribe(value => this.cartCount=value)
    this.authService.isAuthenticated.subscribe(value => this.isLogged = value)
  }
}
