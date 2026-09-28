package com.example.asteristico.dto.login;

import com.example.asteristico.dto.usuario.UsuarioResponseDTO;

public record LoginResponseDTO(UsuarioResponseDTO response, String token) {
    
}
