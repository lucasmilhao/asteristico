package com.example.asteristico.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.asteristico.dto.login.LoginResponseDTO;
import com.example.asteristico.dto.login.LoginRequestDTO;
import com.example.asteristico.dto.usuario.UsuarioRequestDTO;
import com.example.asteristico.service.AuthService;
import com.example.asteristico.types.TypeProvider;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController 
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> criarUsuario(@RequestBody @Valid UsuarioRequestDTO request, HttpServletResponse response) {
        LoginResponseDTO result = service.registrarUsuario(request);

        setarToken(result, response);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUsuario(@RequestBody @Valid LoginRequestDTO request, HttpServletResponse response) {
        LoginResponseDTO result = service.login(TypeProvider.LOCAL, request);

        setarToken(result, response);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
    
    @PostMapping("/google")
    public ResponseEntity<LoginResponseDTO> loginGoogle(@RequestBody @Valid String request, HttpServletResponse response) {
        LoginResponseDTO result = service.login(TypeProvider.GOOGLE, request);

        setarToken(result, response);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    public void setarToken(LoginResponseDTO result, HttpServletResponse response) {
        

        ResponseCookie cookie = ResponseCookie
                .from("access_token", result.token())
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookie.toString()
        );

    }

}
