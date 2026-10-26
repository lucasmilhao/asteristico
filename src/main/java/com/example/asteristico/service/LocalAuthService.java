package com.example.asteristico.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.asteristico.dto.login.LoginRequestDTO;
import com.example.asteristico.dto.usuario.AuthenticatedUserDTO;
import com.example.asteristico.exception.usuario.UsuarioNaoEncontradoException;
import com.example.asteristico.model.AuthenticationProvider;
import com.example.asteristico.model.Credential;
import com.example.asteristico.model.Usuario;
import com.example.asteristico.repository.UsuarioRepository;
import com.example.asteristico.types.TypeProvider;

@Service
public class LocalAuthService implements AuthenticationProvider<LoginRequestDTO> {

    @Autowired 
    private PasswordEncoder passwordEncoder;

    @Autowired 
    private UsuarioRepository usuarioRepository;

    @Override
    public TypeProvider getProvider() {
        return TypeProvider.LOCAL;
    }

    @Override
    public AuthenticatedUserDTO authenticate(LoginRequestDTO dto) {
        Usuario u = usuarioRepository.findByEmail(dto.email()).orElseThrow(() -> new UsuarioNaoEncontradoException());
        Credential cred = u.getCredentials().stream().filter(e -> e.getProvider() == getProvider()).toList().getFirst();

        if(!passwordEncoder.matches(dto.senha(), cred.getPasswordHash())) {
            throw new RuntimeException("Usuario ou senha inválidos");
        }

        return new AuthenticatedUserDTO(
            getProvider(),
            u.getEmail(),
            u.getEmail(),
            u.getNomeCompleto(),
            u.getTelefone(),
            u.getArea(),
            u.getPicture(),
            u.getBio(),
            u.getIsDisponivel()
        );
    }



}
