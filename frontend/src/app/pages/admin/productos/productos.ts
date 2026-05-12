import { Component, inject, OnInit, signal, computed } from '@angular/core';
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
  filtroBusqueda = signal('');
  filtroCategoria = signal(0);

  productosFiltrados = computed(() => {
    return this.productos().filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(this.filtroBusqueda().toLowerCase());
      const coincideCategoria = this.filtroCategoria() === 0 || p.categoriaId === this.filtroCategoria();
      return coincideNombre && coincideCategoria;
    });
  });

  form = signal({
    nombre: '', descripcion: '', precio: 0,
    stock: 0, imagenUrl: '', activo: true, categoriaId: 0
  });

  ngOnInit() {
    this.cargar();
    this.productoService.getCategorias().subscribe(c => this.categorias.set(c));
  }

  cargar() {
    this.productoService.getTodosLosProductos().subscribe(p => this.productos.set(p));
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
        this.productos.update(lista => lista.map(p => p.id === e.id ? productoGuardado : p));
      } else {
        this.productos.update(lista => [...lista, productoGuardado]);
      }
      this.modoFormulario.set(false);
    });
  }

  toggleActivo(p: Producto) {
    if (p.activo) {
      if (confirm('¿Desactivar este producto? Dejará de aparecer en el catálogo.')) {
        this.productoService.eliminarProducto(p.id).subscribe(() => {
          this.productos.update(lista => lista.map(x => x.id === p.id ? { ...x, activo: false } : x));
        });
      }
    } else {
      this.productoService.activarProducto(p.id).subscribe(() => {
        this.productos.update(lista => lista.map(x => x.id === p.id ? { ...x, activo: true } : x));
      });
    }
  }

  cancelar() { this.modoFormulario.set(false); }

  setForm(campo: string, valor: any) {
    this.form.update(f => ({ ...f, [campo]: valor }));
  }
}