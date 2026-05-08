import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro').then(m => m.Registro) },
  { path: 'catalogo', loadComponent: () => import('./pages/catalogo/catalogo').then(m => m.Catalogo), canActivate: [authGuard] },
  { path: 'producto/:id', loadComponent: () => import('./pages/detalle-producto/detalle-producto').then(m => m.DetalleProducto), canActivate: [authGuard] },
  { path: 'carrito', loadComponent: () => import('./pages/carrito/carrito').then(m => m.Carrito), canActivate: [authGuard] },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout), canActivate: [authGuard] },
  { path: 'admin/productos', loadComponent: () => import('./pages/admin/productos/productos').then(m => m.Productos), canActivate: [authGuard, adminGuard] },
  { path: 'admin/pedidos', loadComponent: () => import('./pages/admin/pedidos/pedidos').then(m => m.Pedidos), canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: 'login' }
];