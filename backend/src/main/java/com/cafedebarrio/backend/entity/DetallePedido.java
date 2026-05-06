package com.cafedebarrio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "detalle_pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(nullable = false)
    private Double precioUnitario;

    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
}