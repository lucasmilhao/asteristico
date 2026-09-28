package com.example.asteristico.model;

import java.util.ArrayList;
import java.util.List;

import com.example.asteristico.types.TypeArea;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuario")
@Getter 
@Setter 
@EqualsAndHashCode 
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    private String email;

    private String telefone;

    @Enumerated(EnumType.STRING)
    private TypeArea area;

    @Column(name = "id_disponivel")
    private Boolean isDisponivel;

    @OneToMany(mappedBy = "usuario")
    private List<Credential> credentials = new ArrayList<>();
}
