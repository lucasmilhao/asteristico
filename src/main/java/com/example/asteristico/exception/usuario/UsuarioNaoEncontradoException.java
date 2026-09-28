package com.example.asteristico.exception.usuario;

public class UsuarioNaoEncontradoException extends RuntimeException {
    
    public UsuarioNaoEncontradoException() {
        super("Usuario não encontrado.");
    }

    public UsuarioNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
