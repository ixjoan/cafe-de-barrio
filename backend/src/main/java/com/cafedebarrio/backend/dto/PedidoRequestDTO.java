package com.cafedebarrio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import java.util.List;

@Data
public class PedidoRequestDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String clienteNombre;

    @NotBlank(message = "El celular es obligatorio")
    private String celular;

    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;

    @NotEmpty(message = "Debe incluir al menos un producto")
    private List<DetallePedidoDTO> detalles;
}