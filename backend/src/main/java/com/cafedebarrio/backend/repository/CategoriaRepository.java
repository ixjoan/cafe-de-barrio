package com.cafedebarrio.backend.repository;

import com.cafedebarrio.backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}