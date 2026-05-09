import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoRequest, PedidoResponse } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  private apiUrl = 'https://cafe-de-barrio-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.apiUrl}/pedidos`);
  }

  crearPedido(pedido: PedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(`${this.apiUrl}/pedidos`, pedido);
  }

  actualizarEstado(id: number, estado: string): Observable<PedidoResponse> {
    return this.http.patch<PedidoResponse>(`${this.apiUrl}/pedidos/${id}/estado`, { estado });
  }
}