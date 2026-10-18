import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService, Product } from '../products';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="details-container">
      <a routerLink="/products" class="back-link">← Назад до списку</a>

      @if (loading()) {
        <p class="loading">Завантаження інформації про товар...</p>
      } @else if (error()) {
        <p class="error-msg">{{ error() }}</p>
      } @else if (product()) {
        <div class="product-card-detail">
          <h2>{{ product()?.title }}</h2>
          <p class="category">Категорія: {{ product()?.category }}</p>
          <p class="description">{{ product()?.description }}</p>
          <p class="price">Ціна: {{ product()?.price }} $</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .details-container { padding: 1.5rem; max-width: 600px; }
    .back-link { display: inline-block; margin-bottom: 1rem; color: #2563eb; text-decoration: none; font-weight: bold; }
    .product-card-detail { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .category { color: #6b7280; font-style: italic; }
    .description { margin: 1rem 0; line-height: 1.5; color: #374151; }
    .price { font-size: 1.5rem; font-weight: bold; color: #059669; }
    .error-msg { color: #dc2626; font-weight: bold; }
    .loading { font-size: 1.1rem; color: #4b5563; }
  `]
})
export class ProductDetailsComponent implements OnInit {
  // Локальний стан на Signals
  product = signal<Product | null>(null);
  loading = signal<boolean>(true);
  error = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // Зчитуємо id з URL параметра (/products/:id)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productsService.get(id).subscribe({
      next: (data) => {
        this.product.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Не вдалося завантажити деталі товару');
        this.loading.set(false);
      }
    });
  }
}