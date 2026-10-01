package com.example.asteristico.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.asteristico.dto.usuario.UsuarioRequestDTO;
import com.example.asteristico.dto.usuario.UsuarioResponseDTO;
import com.example.asteristico.model.Usuario;
import com.example.asteristico.service.UploadService;
import com.example.asteristico.service.UsuarioService;
import com.example.asteristico.types.TypeArea;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @Autowired
    private UploadService uploadService;

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> getTodos() {
        List<UsuarioResponseDTO> usuarios = service.getTodos().stream()
                .map(UsuarioResponseDTO::new)
                .toList();

        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<UsuarioResponseDTO> getUsuarioPorId(@PathVariable String idUsuario) {
        Usuario u = service.getPorId(idUsuario);
        return ResponseEntity.ok(new UsuarioResponseDTO(u));
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<UsuarioResponseDTO> editarUsuario(
            @PathVariable String idUsuario,
            @RequestParam String nomeCompleto,
            @RequestParam String email,
            @RequestParam String telefone,
            @RequestParam String bio,
            @RequestParam TypeArea area,
            @RequestParam(required = false) MultipartFile foto) {

        Usuario u = service.getPorId(idUsuario);

        String url = u.getPicture();

        if (foto != null && !foto.isEmpty()) {
            url = uploadService.subirArquivo(foto);
        }

        UsuarioRequestDTO request = new UsuarioRequestDTO(
                nomeCompleto,
                email,
                telefone,
                area,
                true,
                url,
                bio,
                "");

        Usuario usuarioAtualizado = service.editarUsuario(idUsuario, request);

        return ResponseEntity.ok(new UsuarioResponseDTO(usuarioAtualizado));
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> getMe(@AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(new UsuarioResponseDTO(usuario));
    }

}
