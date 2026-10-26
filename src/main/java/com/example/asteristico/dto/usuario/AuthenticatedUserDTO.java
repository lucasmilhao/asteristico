package com.example.asteristico.dto.usuario;

import com.example.asteristico.types.TypeArea;
import com.example.asteristico.types.TypeProvider;

public record AuthenticatedUserDTO(
    TypeProvider typeProvider,
    String externalId,
    String email,
    String nomeCompleto,
    String telefone,
    TypeArea area,
    String picture,
    String bio,
    Boolean isDisponivel
) {}
