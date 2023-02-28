import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../domain/Product";
import {CartService} from "../../services/cart.service";
import {OrderItem} from "../../domain/OrderItem";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  constructor(
    private route: ActivatedRoute, private productService: ProductService, private cartService: CartService
  ) {}

  product: Product | null = null
  quantity = 1
  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    // Find the product that correspond with the id provided in route.
    this.productService.getOne(productIdFromRoute).subscribe(response => this.product=response.body)
  }

  addToCart(product: Product) {
    this.cartService.addItem(new OrderItem(0, this.quantity, product))
    alert(`${product.name} added to cart`)
  }

}
