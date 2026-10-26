package com.example.asteristico.dto.servico;

import com.example.asteristico.dto.usuario.UsuarioResponseDTO;
import com.example.asteristico.model.Servico;
import com.example.asteristico.types.TypeContratacao;

public record ServicoResponseDTO(String id, Float preco, UsuarioResponseDTO usuario,TypeContratacao tipoContratacao, String titulo, String descricao, Boolean isDisponivel) {

    public ServicoResponseDTO(Servico s) {
        this(s.getId(), s.getPreco(), new UsuarioResponseDTO(s.getUsuario()), s.getTipoContratacao(), s.getTitulo(), s.getDescricao(), s.getIsDisponivel());
    }

}
