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
    this.pedidoService.getPedidos().subscribe(p => this.pedidos.set(p));
  }

  cambiarEstado(id: number, estado: string) {
    this.pedidoService.actualizarEstado(id, estado).subscribe(() => this.cargar());
  }

  estadoSiguiente(estado: string): string {
    if (estado === 'PENDIENTE') return 'EN_PREPARACION';
    if (estado === 'EN_PREPARACION') return 'ENTREGADO';
    return '';
  }

  etiquetaSiguiente(estado: string): string {
    if (estado === 'PENDIENTE') return 'En preparación';
    if (estado === 'EN_PREPARACION') return 'Entregado';
    return '';
  }
}