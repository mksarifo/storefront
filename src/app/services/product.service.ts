import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../config/constants";
import {Product} from "../domain/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProducts(page: number, size: number): Observable<HttpResponse<Product[]>> {
    return this.http
      .get<Product[]>(`${BASE_URL}/products?_page=${page}&_limit=${size}`, {observe: 'response'})
  }

  getOne(id: number): Observable<HttpResponse<Product>> {
    return this.http
      .get<Product>(`${BASE_URL}/products/${id}`, {observe: 'response'})
  }
}
