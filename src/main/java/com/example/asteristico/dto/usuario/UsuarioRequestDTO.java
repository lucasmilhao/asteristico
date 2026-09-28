package com.example.asteristico.dto.usuario;

import com.example.asteristico.types.TypeArea;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(

        @NotBlank(message = "O campo de Nome não pode estar vazio")
        @Size(min = 5, message = "Nome curto demais")
        String nomeCompleto,

        @NotBlank(message = "O campo de Email não pode estar vazio")
        @Email(message = "Email inválido")
        String email,
        
        @Pattern(regexp = "^\\d{10,11}$", message = "Telefone inválido")
        String telefone,

        TypeArea area,

        Boolean isDisponivel,

        String senha
        
        ) {}
