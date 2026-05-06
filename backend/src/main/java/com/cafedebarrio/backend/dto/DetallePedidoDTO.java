package com.cafedebarrio.backend.dto;

import lombok.Data;

@Data
public class DetallePedidoDTO {
    private Long productoId;
    private Integer cantidad;
}