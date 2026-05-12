import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos implements OnInit {
  private productoService = inject(ProductoService);

  productos = signal<Producto[]>([]);
  categorias = signal<Categoria[]>([]);
  modoFormulario = signal(false);
  editando = signal<Producto | null>(null);

  form = signal({
    nombre: '', descripcion: '', precio: 0,
    stock: 0, imagenUrl: '', activo: true, categoriaId: 0
  });

  ngOnInit() {
    this.cargar();
    this.productoService.getCategorias().subscribe(c => this.categorias.set(c));
  }

  cargar() {
    this.productoService.getProductos().subscribe(p => this.productos.set(p));
  }

  abrirNuevo() {
    this.editando.set(null);
    this.form.set({ nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '', activo: true, categoriaId: 0 });
    this.modoFormulario.set(true);
  }

  abrirEditar(p: Producto) {
    this.editando.set(p);
    this.form.set({ nombre: p.nombre, descripcion: p.descripcion, precio: p.precio, stock: p.stock, imagenUrl: p.imagenUrl || '', activo: p.activo, categoriaId: p.categoriaId });
    this.modoFormulario.set(true);
  }

  guardar() {
    const e = this.editando();
    const obs = e
      ? this.productoService.actualizarProducto(e.id, this.form())
      : this.productoService.crearProducto(this.form());

    obs.subscribe(productoGuardado => {
      if (e) {
        // Editar: reemplaza en la misma posición
        this.productos.update(lista =>
          lista.map(p => p.id === e.id ? productoGuardado : p)
        );
      } else {
        // Nuevo: agrega al final
        this.productos.update(lista => [...lista, productoGuardado]);
      }
      this.modoFormulario.set(false);
    });
  }

  eliminar(id: number) {
    if (confirm('¿Desactivar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.productos.update(lista => lista.filter(p => p.id !== id));
      });
    }
  }

  cancelar() { this.modoFormulario.set(false); }

  setForm(campo: string, valor: any) {
    this.form.update(f => ({ ...f, [campo]: valor }));
  }
}