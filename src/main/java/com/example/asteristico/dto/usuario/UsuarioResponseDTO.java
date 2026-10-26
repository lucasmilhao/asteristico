package com.example.asteristico.dto.usuario;

import com.example.asteristico.model.Usuario;
import com.example.asteristico.types.TypeArea;

public record UsuarioResponseDTO(String id, String nomeCompleto, String email, String telefone, TypeArea area, Boolean isDisponivel, String picture, String bio) {

    public UsuarioResponseDTO(Usuario u) {
        this(u.getId(), u.getNomeCompleto(), u.getEmail(), u.getTelefone(), u.getArea(), u.getIsDisponivel(), u.getPicture(), u.getBio());
    }
    
}
