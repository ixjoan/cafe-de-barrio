import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss'
})
export class Carrito {
  carritoService = inject(CarritoService);
  private router = inject(Router);

  actualizar(productoId: number, valor: string, stockMax: number) {
  let cantidad = Number(valor);
  if (cantidad > stockMax) cantidad = stockMax;
  this.carritoService.actualizar(productoId, cantidad);
  }

  eliminar(productoId: number) {
    this.carritoService.eliminar(productoId);
  }

  irACheckout() {
    this.router.navigate(['/checkout']);
  }
}