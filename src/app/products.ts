import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id?: number;
  title: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Тестові дані (Mock Data)
  private mockProducts: Product[] = [
    { id: 1, title: 'Fjallraven - Backpack', price: 109.95, category: "men's clothing", description: 'Your perfect pack for everyday use' },
    { id: 2, title: 'Mens Casual Premium T-Shirts', price: 22.3, category: "men's clothing", description: 'Slim-fitting style' },
    { id: 3, title: 'Cotton Jacket', price: 55.99, category: "men's clothing", description: 'Great outerwear jackets for Spring/Autumn' },
    { id: 4, title: 'John Hardy Women Dragon Station Chain Bracelet', price: 695, category: 'jewelery', description: 'From our Legends Collection' },
    { id: 5, title: 'Solid Gold Petite Micropave', price: 168, category: 'jewelery', description: 'Satisfaction Guaranteed' },
    { id: 6, title: 'WD 2TB External Hard Drive', price: 64, category: 'electronics', description: 'USB 3.0 and USB 2.0 Compatibility' },
    { id: 7, title: 'SanDisk SSD PLUS 1TB', price: 109, category: 'electronics', description: 'Easy upgrade for faster boot up' }
  ];

  list(): Observable<Product[]> {
    return of(this.mockProducts); // of() повертає RxJS Observable із даними
  }

  get(id: number): Observable<Product> {
    const product = this.mockProducts.find(p => p.id === id) || this.mockProducts[0];
    return of(product);
  }

  create(product: Product): Observable<Product> {
    product.id = this.mockProducts.length + 1;
    this.mockProducts.push(product);
    return of(product);
  }

  update(id: number, product: Product): Observable<Product> {
    return of(product);
  }

  delete(id: number): Observable<boolean> {
  this.mockProducts = this.mockProducts.filter(p => p.id !== id);
  return of(true);
 }
}