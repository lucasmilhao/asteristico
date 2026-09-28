package com.example.asteristico.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.asteristico.dto.usuario.UsuarioResponseDTO;
import com.example.asteristico.service.UsuarioService;

@RestController 
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired 
    private UsuarioService service;

    @GetMapping 
    public ResponseEntity<List<UsuarioResponseDTO>> getTodos() {
        List<UsuarioResponseDTO> usuarios = service.getTodos().stream()
                .map(UsuarioResponseDTO::new)
                .toList();

        return ResponseEntity.ok(usuarios);
    }

}
