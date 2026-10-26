package com.example.asteristico.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.asteristico.dto.servico.ServicoRequestDTO;
import com.example.asteristico.dto.servico.ServicoResponseDTO;
import com.example.asteristico.model.Servico;
import com.example.asteristico.service.ServicoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController 
@RequestMapping("/servico")
public class ServicoController {
    
    @Autowired 
    private ServicoService service;

    @PostMapping 
    public ResponseEntity<ServicoResponseDTO> criarServico(@RequestBody ServicoRequestDTO request) {
        Servico s = service.criarServico(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(new ServicoResponseDTO(s));
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<ServicoResponseDTO>> getMethodName(@PathVariable String idUsuario) {
        List<ServicoResponseDTO> lista = service.getPorUsuario(idUsuario).stream()
                .map(ServicoResponseDTO::new)
                .toList();
                
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{idServico}")
    public ResponseEntity<Void> deletarServico(@PathVariable String idServico) {
        service.deletarServico(idServico);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{idServico}")
    public ResponseEntity<ServicoResponseDTO> editarServico(@PathVariable String idServico, @RequestBody ServicoRequestDTO request) {
        Servico s = service.editarServico(idServico, request);

        return ResponseEntity.ok(new ServicoResponseDTO(s));
    }
    

}
