import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { ToastService } from '../../services/toast.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-detalle-producto',
  imports: [RouterLink],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.scss'
})
export class DetalleProducto implements OnInit {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private toastService = inject(ToastService);

  producto = signal<Producto | null>(null);
  cantidad = signal(1);
  agregado = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProducto(id).subscribe(p => {
      this.producto.set(p);
      const itemActual = this.carritoService.carrito().find(i => i.producto.id === p.id);
      const cantidadEnCarrito = itemActual ? itemActual.cantidad : 0;
      this.cantidadMaxima.set(p.stock - cantidadEnCarrito);
    });
  }

  cantidadMaxima = signal(0);

  incrementar() {
    if (this.cantidad() < this.cantidadMaxima()) {
      this.cantidad.update(c => c + 1);
    }
  }

  decrementar() {
    if (this.cantidad() > 1) this.cantidad.update(c => c - 1);
  }

  agregar() {
    const p = this.producto();
    if (p) {
      const itemActual = this.carritoService.carrito().find(i => i.producto.id === p.id);
      const cantidadEnCarrito = itemActual ? itemActual.cantidad : 0;
      if (cantidadEnCarrito + this.cantidad() > p.stock) {
        this.toastService.mostrar('No hay suficiente stock disponible', 'warning');
        return;
      }
      this.carritoService.agregar(p, this.cantidad());
      this.toastService.mostrar(`¡${p.nombre} agregado al carrito!`, 'success');
      this.agregado.set(true);
      setTimeout(() => this.agregado.set(false), 2000);
    }
  }
}