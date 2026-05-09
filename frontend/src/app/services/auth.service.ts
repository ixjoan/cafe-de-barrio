import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'https://cafe-de-barrio-backend.onrender.com/api/auth';
  private tokenKey = 'cafe_token';
  private userKey = 'cafe_user';
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private router = inject(Router);

  usuario = signal<{ username: string; rol: string } | null>(this.cargarUsuario());

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  guardarSesion(token: string, username: string, rol: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify({ username, rol }));
    }
    this.usuario.set({ username, rol });
  }

  cerrarSesion() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.usuario.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.usuario()?.rol === 'ADMIN';
  }

  private cargarUsuario() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.userKey);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
}