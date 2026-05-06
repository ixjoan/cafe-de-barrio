package com.cafedebarrio.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PedidoResponseDTO {
    private Long id;
    private String clienteNombre;
    private String celular;
    private String direccion;
    private LocalDateTime fecha;
    private String estado;
    private Double total;
    private List<DetalleResponseDTO> detalles;

    @Data
    public static class DetalleResponseDTO {
        private String productoNombre;
        private Integer cantidad;
        private Double precioUnitario;
        private Double subtotal;
    }
}