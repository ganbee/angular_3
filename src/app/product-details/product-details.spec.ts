import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductDetailsComponent } from './product-details';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});