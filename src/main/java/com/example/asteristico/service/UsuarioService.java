package com.example.asteristico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
