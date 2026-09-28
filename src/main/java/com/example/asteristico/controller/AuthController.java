package com.example.asteristico.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.asteristico.dto.login.LoginResponseDTO;
import com.example.asteristico.dto.usuario.UsuarioRequestDTO;
import com.example.asteristico.service.AuthService;

import jakarta.validation.Valid;

@RestController 
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> criarUsuario(@RequestBody @Valid UsuarioRequestDTO request) {
        LoginResponseDTO response = service.registrarUsuario(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
