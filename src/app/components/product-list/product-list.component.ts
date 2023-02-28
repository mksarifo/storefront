import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../domain/Product";
import {TOTAL_COUNT_RESPONSE_HEADER} from "../../config/constants";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  constructor(private productService: ProductService) {}

  items: Product[] | null = []

  page = 1
  pageSize = 10
  totalItems: number = 0

  round(number: number) {
    return Math.ceil(number)
  }

  ngOnInit() {
    if (!this.totalItems) {
      this.totalItems = 0
    }
    this.productService
      .getProducts(this.page, this.pageSize)
      .subscribe(response => {
        this.totalItems = Number(response.headers.get(TOTAL_COUNT_RESPONSE_HEADER))
        this.items = response['body']
      })
  }

  pageChange() {
    this.productService
      .getProducts(this.page, this.pageSize)
      .subscribe(response => {
        this.totalItems = Number(response.headers.get(TOTAL_COUNT_RESPONSE_HEADER))
        this.items = response['body']
      })
  }
}
