import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  mensaje: string;
  tipo: 'success' | 'error' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);
  private contador = 0;

  mostrar(mensaje: string, tipo: 'success' | 'error' | 'warning' = 'success') {
    const id = ++this.contador;
    this.toasts.update(t => [...t, { id, mensaje, tipo }]);
    setTimeout(() => this.eliminar(id), 3000);
  }

  eliminar(id: number) {
    this.toasts.update(t => t.filter(x => x.id !== id));
  }
}