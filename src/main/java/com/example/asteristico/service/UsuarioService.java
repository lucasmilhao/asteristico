package com.example.asteristico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.asteristico.dto.usuario.UsuarioRequestDTO;
import com.example.asteristico.model.Usuario;
import com.example.asteristico.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario getPorId(String idUsuario) {
        return usuarioRepository.findById(idUsuario).orElseThrow(() -> new RuntimeException());
    }

    public Usuario editarUsuario(
            String idUsuario,
            UsuarioRequestDTO request) {
        Usuario u = getPorId(idUsuario);

        u.setNomeCompleto(request.nomeCompleto());
        u.setEmail(request.email());
        u.setTelefone(request.telefone());
        u.setArea(request.area());
        u.setIsDisponivel(request.isDisponivel());
        u.setBio(request.bio());

        if (request.picture() != null && !request.picture().isBlank()) {
            u.setPicture(request.picture());
        }

        return usuarioRepository.save(u);
    }

}
