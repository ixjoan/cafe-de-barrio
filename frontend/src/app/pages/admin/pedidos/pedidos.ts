import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { PedidoResponse } from '../../../models/pedido.model';

@Component({
  selector: 'app-pedidos',
  imports: [DatePipe],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.scss'
})
export class Pedidos implements OnInit {
  private pedidoService = inject(PedidoService);
  pedidos = signal<PedidoResponse[]>([]);

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.pedidoService.getPedidos().subscribe(p => {
      this.pedidos.set(p.sort((a, b) => b.id - a.id));
    });
  }

  cambiarEstado(id: number, estado: string) {
    this.pedidoService.actualizarEstado(id, estado).subscribe(pedidoActualizado => {
      this.pedidos.update(lista =>
        lista.map(p => p.id === id ? { ...p, estado: pedidoActualizado.estado } : p)
      );
    });
  }
}