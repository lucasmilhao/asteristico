package com.example.asteristico.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.asteristico.dto.login.LoginResponseDTO;
import com.example.asteristico.dto.usuario.AuthenticatedUserDTO;
import com.example.asteristico.dto.usuario.UsuarioRequestDTO;
import com.example.asteristico.dto.usuario.UsuarioResponseDTO;
import com.example.asteristico.infra.security.TokenService;
import com.example.asteristico.model.AuthenticationProvider;
import com.example.asteristico.model.Credential;
import com.example.asteristico.model.Usuario;
import com.example.asteristico.repository.CredentialRepository;
import com.example.asteristico.repository.UsuarioRepository;
import com.example.asteristico.types.TypeProvider;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    @Autowired
    private final UsuarioRepository usuarioRepository;
    
    @Autowired
    private final CredentialRepository credentialRepository;
    
    @Autowired
    private final AuthenticationProviderFactory providerFactory;
    
    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final TokenService tokenService;
    
    @Autowired
    private final UsuarioRepository userRepository;

    // @Autowired
    // private TokenRedefinicaoSenhaRepository tokenRepository;

    // @Autowired
    // private EmailService emailService;

    public <T> LoginResponseDTO login(
            TypeProvider provider,
            T credential) {

        AuthenticationProvider<T> authenticationProvider = providerFactory.get(provider);

        AuthenticatedUserDTO authenticated = authenticationProvider.authenticate(credential);

        Usuario usuario = buscarOuCriarUsuario(authenticated);

        String token = tokenService.generateToken(usuario);

        return new LoginResponseDTO(
                new UsuarioResponseDTO(usuario),
                token);
    }

    public LoginResponseDTO registrarUsuario(UsuarioRequestDTO request) {
        Optional<Usuario> uEmail = userRepository.findByEmail(request.email());
        Optional<Usuario> uNome = userRepository.findByNomeCompleto(request.nomeCompleto());

        Map<String, String> erros = new HashMap<>();

        if (uEmail.isPresent())
            erros.put("email", "Email já cadastrado.");
        if (uNome.isPresent())
            erros.put("nome", "Nome já em uso.");

        // if (!erros.isEmpty())
        //     throw new UsuarioExistenteException(erros);

        Usuario u = new Usuario();
        u.setNomeCompleto(request.nomeCompleto());
        u.setEmail(request.email());
        u.setTelefone(request.telefone());
        u.setArea(request.area());
        u.setIsDisponivel(request.isDisponivel());
        u.setBio(request.bio());
        u.setPicture(request.picture());

        Credential cred = new Credential();
        cred.setExternalId(u.getEmail());
        cred.setProvider(TypeProvider.LOCAL);
        cred.setPasswordHash(passwordEncoder.encode(request.senha()));
        cred.setUsuario(u);

        userRepository.save(u);
        credentialRepository.save(cred);

        String token = tokenService.generateToken(u);
        return new LoginResponseDTO(new UsuarioResponseDTO(u), token);
    }

    public Usuario buscarOuCriarUsuario(AuthenticatedUserDTO dto) {

        Optional<Credential> cred = credentialRepository.findByProviderAndExternalId(
                dto.typeProvider(),
                dto.externalId());

        if (cred.isPresent()) {
            return cred.get().getUsuario();
        }

        Usuario usuario = usuarioRepository
                .findByEmail(dto.email())
                .orElse(null);

        if (usuario == null) {
            usuario = criarUsuario(dto);
        }

        criarCredential(usuario, dto);

        return usuario;
    }

    private Credential criarCredential(
            Usuario usuario,
            AuthenticatedUserDTO authenticated) {

        Credential credential = new Credential();

        credential.setUsuario(usuario);

        credential.setProvider(authenticated.typeProvider());

        credential.setExternalId(authenticated.externalId());

        if (authenticated.typeProvider() == TypeProvider.LOCAL) {
            credential.setPasswordHash("");
        }

        credentialRepository.save(credential);

        return credential;
    }

    private Usuario criarUsuario(
            AuthenticatedUserDTO authenticated) {

        Usuario usuario = new Usuario();
        usuario.setNomeCompleto(authenticated.nomeCompleto());
        usuario.setEmail(authenticated.email());
        usuario.setTelefone(authenticated.telefone());
        usuario.setArea(authenticated.area());
        usuario.setIsDisponivel(authenticated.isDisponivel());

        usuarioRepository.save(usuario);

        return usuario;
    }
    

    // @Transactional
    // public void solicitarRedefinicao(String email) {

    //     Usuario usuario = usuarioRepository.findByEmail(email)
    //             .orElseThrow(() -> new UsuarioNaoEncontradoException());

    //     String token = gerarToken();

    //     TokenRedefinicaoSenha redefinicao = new TokenRedefinicaoSenha();

    //     redefinicao.setUsuario(usuario);
    //     redefinicao.setToken(token);
    //     redefinicao.setExpiracao(
    //             Instant.now().plus(15, ChronoUnit.MINUTES));
    //     redefinicao.setUtilizado(false);

    //     tokenRepository.save(redefinicao);

    //     emailService.enviarEmailRedefinicao(
    //             usuario.getEmail(),
    //             token);
    // }
    

    // @Transactional
    // public void redefinirSenha(RedefinirSenhaRequestDTO request) {

    //     TokenRedefinicaoSenha token = tokenRepository
    //             .findByToken(request.token())
    //             .orElseThrow(() -> new RuntimeException("Token inválido"));

    //     if (token.isUtilizado()) {
    //         throw new RuntimeException("Token já utilizado");
    //     }

    //     if (token.getExpiracao().isBefore(Instant.now())) {
    //         throw new RuntimeException("Token expirado");
    //     }

    //     Usuario usuario = token.getUsuario();

    //     Optional<Credential> credential = usuario.getCredentials().stream().filter(e -> e.getProvider().equals(TypeProvider.LOCAL)).findFirst();

    //     if(credential.isPresent()) {
    //         Credential c = credential.get();

    //         c.setPasswordHash(passwordEncoder.encode(request.novaSenha()));
            
    //         credentialRepository.save(c);
    //     }
    //     else {
    //         Credential c = new Credential();
    //         c.setExternalId(usuario.getEmail());
    //         c.setProvider(TypeProvider.LOCAL);
    //         c.setPasswordHash(passwordEncoder.encode(request.novaSenha()));
    //         c.setUsuario(usuario);

    //         credentialRepository.save(c);
    //     }

    //     usuarioRepository.save(usuario);

    //     token.setUtilizado(true);

    //     tokenRepository.save(token);
    // }

    // private String gerarToken() {
    //     byte[] bytes = new byte[32];
    //     new SecureRandom().nextBytes(bytes);

    //     return Base64.getUrlEncoder()
    //             .withoutPadding()
    //             .encodeToString(bytes);
    // }

    // private String gerarToken(int qtdBytes) {
    //     byte[] bytes = new byte[qtdBytes];
    //     new SecureRandom().nextBytes(bytes);

    //     return Base64.getUrlEncoder()
    //             .withoutPadding()
    //             .encodeToString(bytes);
    // }
}