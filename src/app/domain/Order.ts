import {Billing} from "./Billing";

export interface Items {
  quantity: number,
  product_id: number
}

export class Order {
  id?: number
  items: Items[]

  details: Billing

  constructor(items: Items[], details: Billing) {
    this.items = items;
    this.details = details;
  }
}
