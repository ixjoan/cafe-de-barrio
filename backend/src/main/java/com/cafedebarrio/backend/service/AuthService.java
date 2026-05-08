package com.cafedebarrio.backend.service;

import com.cafedebarrio.backend.dto.AuthResponse;
import com.cafedebarrio.backend.dto.LoginRequest;
import com.cafedebarrio.backend.dto.RegisterRequest;
import com.cafedebarrio.backend.entity.Rol;
import com.cafedebarrio.backend.entity.Usuario;
import com.cafedebarrio.backend.repository.RolRepository;
import com.cafedebarrio.backend.repository.UsuarioRepository;
import com.cafedebarrio.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(usuario.getUsername(), usuario.getRol().getNombre());
        return new AuthResponse(token, usuario.getUsername(), usuario.getRol().getNombre());
    }

    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("El usuario ya existe");
        }

        Rol rol = rolRepository.findByNombre("CLIENTE")
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol(rol);
        usuario.setActivo(true);

        usuarioRepository.save(usuario);

        String token = jwtUtil.generateToken(usuario.getUsername(), rol.getNombre());
        return new AuthResponse(token, usuario.getUsername(), rol.getNombre());
    }
}