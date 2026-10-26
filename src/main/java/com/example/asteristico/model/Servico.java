package com.example.asteristico.model;

import com.example.asteristico.types.TypeContratacao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name = "servico")
@Getter 
@Setter 
@AllArgsConstructor 
@NoArgsConstructor 
@EqualsAndHashCode 
public class Servico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario usuario;

    private Float preco;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_contratacao")
    private TypeContratacao tipoContratacao;

    private String titulo;
    
    private String descricao;

    private Boolean isDisponivel;
}
