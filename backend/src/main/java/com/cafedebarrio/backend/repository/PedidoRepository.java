package com.cafedebarrio.backend.repository;

import com.cafedebarrio.backend.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}