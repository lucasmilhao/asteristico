package com.example.asteristico.dto.servico;

import com.example.asteristico.types.TypeContratacao;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ServicoRequestDTO(
    @NotNull(message = "O id do usuario não pode ser nulo")
    String idUsuario,
    
    @NotNull(message = "Preco não pode ser nulo")    
    @Positive(message = "Preço tem que ser positivo")
    Float preco,

    @NotNull(message = "O tipo da contratacao não pode ser nulo")
    TypeContratacao tipoContratacao,
    
    @NotNull(message = "O titulo não pode ser nulo")
    String titulo,
    
    @NotNull(message = "A descrição não pode ser nula")
    String descricao,

    Boolean isDisponivel
) {}
