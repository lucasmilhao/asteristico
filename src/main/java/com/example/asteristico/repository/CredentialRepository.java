package com.example.asteristico.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.asteristico.model.Credential;
import com.example.asteristico.types.TypeProvider;

public interface CredentialRepository extends JpaRepository<Credential, String>{
    Optional<Credential> findByProviderAndExternalId(TypeProvider provider, String externalId);
}
