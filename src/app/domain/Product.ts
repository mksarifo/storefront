export class Product {

  id: number
  name: string
  description: string
  price: number
  stockQuantity: number
  imageUrl: string


  constructor(id: number, name: string, description: string, price: number, stockQuantity: number, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.imageUrl = imageUrl;
  }
}
