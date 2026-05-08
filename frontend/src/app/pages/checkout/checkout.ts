import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  private carritoService = inject(CarritoService);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);

  carrito = this.carritoService.carrito;
  total = this.carritoService.total;

  nombre = signal('');
  celular = signal('');
  direccion = signal('');
  error = signal('');
  cargando = signal(false);
  pedidoConfirmado = signal(false);

  confirmar() {
    if (!this.nombre() || !this.celular() || !this.direccion()) {
      this.error.set('Por favor completa todos los campos.');
      return;
    }
    this.error.set('');
    this.cargando.set(true);

    const pedido = {
      clienteNombre: this.nombre(),
      celular: this.celular(),
      direccion: this.direccion(),
      detalles: this.carrito().map(i => ({
        productoId: i.producto.id,
        cantidad: i.cantidad
      }))
    };

    this.pedidoService.crearPedido(pedido).subscribe({
      next: () => {
        this.carritoService.vaciar();
        this.pedidoConfirmado.set(true);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Error al registrar el pedido.');
        this.cargando.set(false);
      }
    });
  }
}