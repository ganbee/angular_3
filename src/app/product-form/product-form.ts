import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-card">
      <h2>Додати новий товар</h2>

      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <!-- Поле Назва -->
        <div class="form-group">
          <label for="title">Назва товару *</label>
          <input id="title" type="text" formControlName="title" class="form-control" />
          @if (productForm.get('title')?.touched && productForm.get('title')?.hasError('required')) {
            <small class="error-text">Назва товару є обов'язковою!</small>
          }
        </div>

        <!-- Поле Ціна -->
        <div class="form-group">
          <label for="price">Ціна ($) *</label>
          <input id="price" type="number" formControlName="price" class="form-control" />
          @if (productForm.get('price')?.touched && productForm.get('price')?.hasError('min')) {
            <small class="error-text">Ціна повинна бути більшою за 0!</small>
          }
        </div>

        <!-- Поле Категорія -->
        <div class="form-group">
          <label for="category">Категорія *</label>
          <input id="category" type="text" formControlName="category" class="form-control" />
          @if (productForm.get('category')?.touched && productForm.get('category')?.hasError('required')) {
            <small class="error-text">Категорія є обов'язковою!</small>
          }
        </div>

        <!-- Поле Опис -->
        <div class="form-group">
          <label for="description">Опис</label>
          <textarea id="description" formControlName="description" rows="3" class="form-control"></textarea>
        </div>

        <button type="submit" [disabled]="productForm.invalid" class="submit-btn">
          Зберегти товар
        </button>
      </form>
    </div>
  `,
  styles: [`
    .form-card { max-width: 500px; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .form-group { margin-bottom: 1.2rem; }
    label { display: block; font-weight: bold; margin-bottom: 0.3rem; }
    .form-control { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .error-text { color: #dc2626; font-size: 0.85rem; margin-top: 0.2rem; display: block; }
    .submit-btn { padding: 0.6rem 1.2rem; background-color: #059669; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
    .submit-btn:disabled { background-color: #9ca3af; cursor: not-allowed; }
  `]
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {
    // Ініціалізація структури форми з правилами валідації
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productsService.create(this.productForm.value).subscribe({
        next: () => {
          alert('Товар успішно додано!');
          this.router.navigate(['/products']);
        }
      });
    }
  }
}