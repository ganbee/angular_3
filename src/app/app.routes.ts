import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductsListComponent } from './products-list/products-list';
import { ProductDetailsComponent } from './product-details/product-details';
import { ProductFormComponent } from './product-form/product-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/add', component: ProductFormComponent }, // <--- Маршрут для форми
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' }
];