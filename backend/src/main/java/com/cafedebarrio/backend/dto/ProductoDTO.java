package com.cafedebarrio.backend.dto;

import lombok.Data;

@Data
public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private String imagenUrl;
    private Boolean activo;
    private Long categoriaId;
    private String categoriaNombre;
}