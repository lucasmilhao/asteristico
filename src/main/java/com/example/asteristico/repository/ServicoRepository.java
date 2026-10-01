package com.example.asteristico.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.asteristico.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, String> {
    
    List<Servico> findByUsuarioId(String idUsuario);
}
