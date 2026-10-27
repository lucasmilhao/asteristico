package com.example.asteristico.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.asteristico.dto.usuario.AuthenticatedUserDTO;
import com.example.asteristico.model.AuthenticationProvider;
import com.example.asteristico.types.TypeProvider;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@Service 
public class GoogleAuthService implements AuthenticationProvider<String> {

    @Override
    public TypeProvider getProvider() {
        return TypeProvider.GOOGLE;
    }

    @Override
    public AuthenticatedUserDTO authenticate(String credential) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance())
                .setAudience(List.of("779413582050-p4hmsppiqh5eb201aukp233i2o5q6gt9.apps.googleusercontent.com"))
                .build();

        try {
            System.out.println("Credential: " + credential);
            GoogleIdToken idToken = verifier.verify(credential);

            if(idToken == null) {
                throw new RuntimeException("Token inválido");
            }

            Payload payload = idToken.getPayload();

            String googleId = payload.getSubject();

            String email = payload.getEmail();

            String nome = (String) payload.get("name");

            String picture = (String) payload.get("picture");

            System.out.println(payload);

            // boolean emailVerified = payload.getEmailVerified();

            return new AuthenticatedUserDTO(
                getProvider(),
                googleId,
                email,
                nome,
                "",
                null,
                picture,
                null,
                true
                );
                    
        } catch (GeneralSecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        throw new RuntimeException("Não foi possível logar com o google!");
    }

}
