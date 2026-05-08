import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss'
})
export class Catalogo implements OnInit {
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  productos = signal<Producto[]>([]);
  categorias = signal<Categoria[]>([]);
  categoriaSeleccionada = signal<number | null>(null);
  mensajeAgregado = signal<number | null>(null);

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProductos();
  }

  cargarCategorias() {
    this.productoService.getCategorias().subscribe(c => this.categorias.set(c));
  }

  cargarProductos() {
    const cat = this.categoriaSeleccionada();
    const obs = cat ? this.productoService.getProductosPorCategoria(cat) : this.productoService.getProductos();
    obs.subscribe(p => this.productos.set(p));
  }

  filtrar(categoriaId: number | null) {
    this.categoriaSeleccionada.set(categoriaId);
    this.cargarProductos();
  }

  agregar(producto: Producto) {
    this.carritoService.agregar(producto);
    this.mensajeAgregado.set(producto.id);
    setTimeout(() => this.mensajeAgregado.set(null), 1500);
  }
}