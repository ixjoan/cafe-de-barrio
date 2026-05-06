package com.cafedebarrio.backend.service;

import com.cafedebarrio.backend.dto.DetallePedidoDTO;
import com.cafedebarrio.backend.dto.PedidoRequestDTO;
import com.cafedebarrio.backend.dto.PedidoResponseDTO;
import com.cafedebarrio.backend.entity.DetallePedido;
import com.cafedebarrio.backend.entity.Pedido;
import com.cafedebarrio.backend.entity.Producto;
import com.cafedebarrio.backend.repository.PedidoRepository;
import com.cafedebarrio.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    public List<PedidoResponseDTO> listarTodos() {
        return pedidoRepository.findAll()
                .stream().map(this::toDTO).toList();
    }

    @Transactional
    public PedidoResponseDTO crear(PedidoRequestDTO request) {
        Pedido pedido = new Pedido();
        pedido.setClienteNombre(request.getClienteNombre());
        pedido.setCelular(request.getCelular());
        pedido.setDireccion(request.getDireccion());
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado(Pedido.EstadoPedido.PENDIENTE);

        List<DetallePedido> detalles = new ArrayList<>();
        double total = 0;

        for (DetallePedidoDTO item : request.getDetalles()) {
            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getProductoId()));

            if (producto.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
            }

            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);

            DetallePedido detalle = new DetallePedido();
            detalle.setProducto(producto);
            detalle.setPedido(pedido);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setSubtotal(producto.getPrecio() * item.getCantidad());

            detalles.add(detalle);
            total += detalle.getSubtotal();
        }

        pedido.setTotal(total);
        pedido.setDetalles(detalles);

        return toDTO(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponseDTO actualizarEstado(Long id, String estado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstado(Pedido.EstadoPedido.valueOf(estado));
        return toDTO(pedidoRepository.save(pedido));
    }

    private PedidoResponseDTO toDTO(Pedido pedido) {
        PedidoResponseDTO dto = new PedidoResponseDTO();
        dto.setId(pedido.getId());
        dto.setClienteNombre(pedido.getClienteNombre());
        dto.setCelular(pedido.getCelular());
        dto.setDireccion(pedido.getDireccion());
        dto.setFecha(pedido.getFecha());
        dto.setEstado(pedido.getEstado().name());
        dto.setTotal(pedido.getTotal());

        if (pedido.getDetalles() != null) {
            List<PedidoResponseDTO.DetalleResponseDTO> detallesDTO = pedido.getDetalles().stream().map(d -> {
                PedidoResponseDTO.DetalleResponseDTO det = new PedidoResponseDTO.DetalleResponseDTO();
                det.setProductoNombre(d.getProducto().getNombre());
                det.setCantidad(d.getCantidad());
                det.setPrecioUnitario(d.getPrecioUnitario());
                det.setSubtotal(d.getSubtotal());
                return det;
            }).toList();
            dto.setDetalles(detallesDTO);
        }

        return dto;
    }
}