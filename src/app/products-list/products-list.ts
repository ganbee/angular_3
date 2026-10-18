import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../products';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="products-container">
      <h2>Каталог товарів</h2>
      <a routerLink="/products/add" class="add-btn">+ Додати новий товар</a>
      <!-- Фільтр за категорією -->
      <div class="filter-section">
        <label for="category">Фільтр за категорією: </label>
        <select 
          id="category"
          [ngModel]="selectedCategory()" 
          (ngModelChange)="selectedCategory.set($event)"
          class="select-input">
          <option value="">Усі категорії</option>
          @for (cat of categories(); track cat) {
            <option [value]="cat">{{ cat }}</option>
          }
        </select>
      </div>

      <!-- Індикатор завантаження -->
      @if (loading()) {
        <p class="loading">Завантаження товарів...</p>
      } @else {
        <!-- Список товарів із трекінгом за id -->
        <div class="products-grid">
          @for (p of filteredProducts(); track p.id) {
            <div class="product-card">
              <h3>{{ p.title }}</h3>
              <p class="category">{{ p.category }}</p>
              <p class="price">{{ p.price }} $</p>
              <a [routerLink]="['/products', p.id]" class="details-btn">Детальніше</a>
            </div>
          } @empty {
            <p>Товарів у цій категорії не знайдено.</p>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .products-container { padding: 1rem; }
    .filter-section { margin-bottom: 1.5rem; }
    .select-input { padding: 0.5rem; font-size: 1rem; border-radius: 4px; border: 1px solid #ccc; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
    .product-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .category { color: #6b7280; font-size: 0.875rem; text-transform: capitalize; }
    .price { font-size: 1.25rem; font-weight: bold; color: #059669; }
    .details-btn { display: inline-block; margin-top: 0.5rem; padding: 0.4rem 0.8rem; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px; }
    .loading { font-size: 1.1rem; color: #4b5563; }
    .add-btn { display: inline-block; margin-bottom: 1rem; padding: 0.5rem 1rem; background-color: #16a34a; color: white; border-radius: 4px; text-decoration: none; font-weight: bold; }
  `]
})
export class ProductsListComponent implements OnInit {
  // Сигнали для керування станом списку
  products = signal<Product[]>([]);
  selectedCategory = signal<string>('');
  loading = signal<boolean>(true);

  // Обчислюваний список категорій
  categories = computed(() => {
    const cats = this.products().map(p => p.category);
    return Array.from(new Set(cats));
  });

  // Обчислюваний відфільтрований список товарів
  filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    if (!cat) return this.products();
    return this.products().filter(p => p.category === cat);
  });

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // Отримуємо дані з FakeStoreAPI
    this.productsService.list().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}