package com.cafedebarrio.backend.controller;

import com.cafedebarrio.backend.entity.Categoria;
import com.cafedebarrio.backend.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;

    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {
        return ResponseEntity.ok(categoriaRepository.findAll());
    }
}