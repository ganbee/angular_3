import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products';
import { firstValueFrom } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('має успішно створювати сервіс', () => {
    expect(service).toBeTruthy();
  });

  it('має повертати список тестових товарів', async () => {
    const products = await firstValueFrom(service.list());
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].title).toBe('Fjallraven - Backpack');
  });

  it('має додавати новий товар у масив', async () => {
    const newProduct = { title: 'Тестовий ноутбук', price: 999, category: 'electronics' };
    const created = await firstValueFrom(service.create(newProduct));
    expect(created.id).toBeDefined();
    expect(created.title).toBe('Тестовий ноутбук');
  });
});