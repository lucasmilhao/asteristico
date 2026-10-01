package com.example.asteristico.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.asteristico.model.Arquivo;

public interface ArquivoRepository extends JpaRepository<Arquivo, String>{
    
}
