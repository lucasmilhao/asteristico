package com.example.asteristico.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

import com.example.asteristico.exception.usuario.UsuarioNaoEncontradoException;
import com.example.asteristico.model.Usuario;
import com.example.asteristico.repository.UsuarioRepository;
import com.example.asteristico.types.TypeProvider;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UsuarioRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = this.repository.findByEmail(username).orElseThrow(() -> new UsuarioNaoEncontradoException());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getCredentials().stream().filter(e -> e.getProvider() == TypeProvider.LOCAL).toList().get(0).getPasswordHash(), new ArrayList<>());
    }
}