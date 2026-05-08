import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
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

  producto = signal<Producto | null>(null);
  cantidad = signal(1);
  agregado = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProducto(id).subscribe(p => this.producto.set(p));
  }

  incrementar() {
    const p = this.producto();
    if (p && this.cantidad() < p.stock) this.cantidad.update(c => c + 1);
  }

  decrementar() {
    if (this.cantidad() > 1) this.cantidad.update(c => c - 1);
  }

  agregar() {
    const p = this.producto();
    if (p) {
      this.carritoService.agregar(p, this.cantidad());
      this.agregado.set(true);
      setTimeout(() => this.agregado.set(false), 2000);
    }
  }
}