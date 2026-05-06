package com.cafedebarrio.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clienteNombre;

    @Column(nullable = false)
    private String celular;

    @Column(nullable = false)
    private String direccion;

    private LocalDateTime fecha = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado = EstadoPedido.PENDIENTE;

    private Double total;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<DetallePedido> detalles;

    public enum EstadoPedido {
        PENDIENTE, EN_PREPARACION, ENTREGADO
    }
}