package com.example.asteristico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.asteristico.dto.servico.ServicoRequestDTO;
import com.example.asteristico.model.Servico;
import com.example.asteristico.model.Usuario;
import com.example.asteristico.repository.ServicoRepository;

@Service 
public class ServicoService {
    
    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private UsuarioService usuarioService;

    public Servico criarServico(ServicoRequestDTO request) {
        Usuario usuario = usuarioService.getPorId(request.idUsuario());

        Servico servico = new Servico();
        servico.setUsuario(usuario);
        servico.setPreco(request.preco());
        servico.setTipoContratacao(request.tipoContratacao());
        servico.setTitulo(request.titulo());
        servico.setDescricao(request.descricao());
        servico.setIsDisponivel(request.isDisponivel());;

        return servicoRepository.save(servico);
    }

    public Servico getPorId(String idServico) {
        return servicoRepository.findById(idServico).orElseThrow(() -> new RuntimeException());
    }

    public List<Servico> getPorUsuario(String idUsuario) {
        return servicoRepository.findByUsuarioId(idUsuario);
    }

    public void deletarServico(String idServico) {
        servicoRepository.delete(getPorId(idServico));
    }

    public Servico editarServico(String idServico, ServicoRequestDTO request){
        
        Servico servico = getPorId(idServico);
        servico.setPreco(request.preco());
        servico.setTipoContratacao(request.tipoContratacao());
        servico.setTitulo(request.titulo());
        servico.setDescricao(request.descricao());
        servico.setIsDisponivel(request.isDisponivel());

        return servicoRepository.save(servico);
    }

}
