package com.cafedebarrio.backend.service;

import com.cafedebarrio.backend.dto.ProductoDTO;
import com.cafedebarrio.backend.entity.Categoria;
import com.cafedebarrio.backend.entity.Producto;
import com.cafedebarrio.backend.repository.CategoriaRepository;
import com.cafedebarrio.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public List<ProductoDTO> listarTodos() {
        return productoRepository.findByActivoTrue()
                .stream().map(this::toDTO).toList();
    }

    public List<ProductoDTO> listarPorCategoria(Long categoriaId) {
        return productoRepository.findByCategoriaIdAndActivoTrue(categoriaId)
                .stream().map(this::toDTO).toList();
    }

    public ProductoDTO obtenerPorId(Long id) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return toDTO(p);
    }

    public ProductoDTO crear(ProductoDTO dto) {
        Producto p = toEntity(dto);
        return toDTO(productoRepository.save(p));
    }

    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        p.setNombre(dto.getNombre());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecio(dto.getPrecio());
        p.setStock(dto.getStock());
        p.setImagenUrl(dto.getImagenUrl());
        p.setActivo(dto.getActivo());
        if (dto.getCategoriaId() != null) {
            Categoria cat = categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            p.setCategoria(cat);
        }
        return toDTO(productoRepository.save(p));
    }

    public void eliminar(Long id) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        p.setActivo(false);
        productoRepository.save(p);
    }

    private ProductoDTO toDTO(Producto p) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setDescripcion(p.getDescripcion());
        dto.setPrecio(p.getPrecio());
        dto.setStock(p.getStock());
        dto.setImagenUrl(p.getImagenUrl());
        dto.setActivo(p.getActivo());
        if (p.getCategoria() != null) {
            dto.setCategoriaId(p.getCategoria().getId());
            dto.setCategoriaNombre(p.getCategoria().getNombre());
        }
        return dto;
    }

    private Producto toEntity(ProductoDTO dto) {
        Producto p = new Producto();
        p.setNombre(dto.getNombre());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecio(dto.getPrecio());
        p.setStock(dto.getStock());
        p.setImagenUrl(dto.getImagenUrl());
        p.setActivo(dto.getActivo() != null ? dto.getActivo() : true);
        if (dto.getCategoriaId() != null) {
            Categoria cat = categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            p.setCategoria(cat);
        }
        return p;
    }
}