export interface DetallePedidoRequest {
  productoId: number;
  cantidad: number;
}

export interface PedidoRequest {
  clienteNombre: string;
  celular: string;
  direccion: string;
  detalles: DetallePedidoRequest[];
}

export interface PedidoResponse {
  id: number;
  clienteNombre: string;
  celular: string;
  direccion: string;
  fecha: string;
  estado: string;
  total: number;
  detalles: DetalleResponse[];
}

export interface DetalleResponse {
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}