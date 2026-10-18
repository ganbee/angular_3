import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="navbar">
      <h1>Лабораторна робота №3 — Angular</h1>
      <nav>
        <a routerLink="/" class="nav-link">Home</a> | 
        <a routerLink="/products" class="nav-link">Products</a>
      </nav>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      padding: 1rem 2rem;
      background-color: #1f2937;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-link {
      color: #60a5fa;
      text-decoration: none;
      font-weight: bold;
      margin: 0 0.5rem;
    }
    .nav-link:hover {
      text-decoration: underline;
    }
    .container {
      padding: 2rem;
    }
  `]
})
export class App {}