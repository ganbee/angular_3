import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductsListComponent } from './products-list';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});