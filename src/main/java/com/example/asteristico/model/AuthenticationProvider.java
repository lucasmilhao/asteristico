package com.example.asteristico.model;

import com.example.asteristico.dto.usuario.AuthenticatedUserDTO;
import com.example.asteristico.types.TypeProvider;

public interface AuthenticationProvider<T> {

    TypeProvider getProvider();

    AuthenticatedUserDTO authenticate(T credential);
    
}
