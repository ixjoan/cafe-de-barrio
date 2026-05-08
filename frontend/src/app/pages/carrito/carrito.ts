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

  actualizar(productoId: number, event: Event) {
    const valor = Number((event.target as HTMLInputElement).value);
    this.carritoService.actualizar(productoId, valor);
  }

  eliminar(productoId: number) {
    this.carritoService.eliminar(productoId);
  }

  irACheckout() {
    this.router.navigate(['/checkout']);
  }
}