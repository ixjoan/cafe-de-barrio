import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ItemCarrito } from '../models/carrito.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private items = signal<ItemCarrito[]>([]);

  carrito = this.items.asReadonly();

  total = computed(() =>
    this.items().reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0)
  );

  cantidadTotal = computed(() =>
    this.items().reduce((acc, item) => acc + item.cantidad, 0)
  );

  agregar(producto: Producto, cantidad: number = 1) {
    const actual = this.items();
    const idx = actual.findIndex(i => i.producto.id === producto.id);
    if (idx >= 0) {
      const nuevos = [...actual];
      nuevos[idx] = { ...nuevos[idx], cantidad: nuevos[idx].cantidad + cantidad };
      this.items.set(nuevos);
    } else {
      this.items.set([...actual, { producto, cantidad }]);
    }
  }

  actualizar(productoId: number, cantidad: number) {
    if (cantidad <= 0) {
      this.eliminar(productoId);
      return;
    }
    this.items.set(
      this.items().map(i => i.producto.id === productoId ? { ...i, cantidad } : i)
    );
  }

  eliminar(productoId: number) {
    this.items.set(this.items().filter(i => i.producto.id !== productoId));
  }

  vaciar() {
    this.items.set([]);
  }
}