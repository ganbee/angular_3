import { TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});