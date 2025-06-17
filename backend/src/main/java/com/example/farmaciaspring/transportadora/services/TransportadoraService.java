package com.example.farmaciaspring.transportadora.services;

import com.example.farmaciaspring.transportadora.model.Transportadora;
import com.example.farmaciaspring.transportadora.repository.TransportadoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportadoraService {

    private final TransportadoraRepository transportadoraRepository;

    @Autowired
    public TransportadoraService(TransportadoraRepository transportadoraRepository) {
        this.transportadoraRepository = transportadoraRepository;
    }

    public Transportadora adicionarTransportadora(Transportadora transportadora) {
        if (transportadora == null) {
            throw new IllegalArgumentException("Transportadora não pode ser null.");
        }
        return transportadoraRepository.save(transportadora);
    }

    public Optional<Transportadora> buscarTransportadoraPorId(Long id) {
        return transportadoraRepository.findById(id);
    }

    public List<Transportadora> listarTodasTransportadoras() {
        return transportadoraRepository.findAll();
    }

    public Transportadora atualizarTransportadora(Long id, Transportadora transportadoraAtualizada) {
        if (transportadoraAtualizada == null) {
            throw new IllegalArgumentException("Dados da transportadora atualizada não podem ser null.");
        }
        return transportadoraRepository.findById(id)
                .map(transportadoraExistente -> {
                    transportadoraExistente.setNome(transportadoraAtualizada.getNome());
                    transportadoraExistente.setRegiao(transportadoraAtualizada.getRegiao()); // Atualizado para regiao
                    transportadoraExistente.setStatusParceria(transportadoraAtualizada.getStatusParceria());
                    return transportadoraRepository.save(transportadoraExistente);
                })
                .orElseThrow(() -> new RuntimeException("Transportadora com ID " + id + " não encontrada para atualização."));
    }

    public void removerTransportadora(Long id) {
        if (!transportadoraRepository.existsById(id)) {
            throw new RuntimeException("Transportadora com ID " + id + " não encontrada para remoção.");
        }
        transportadoraRepository.deleteById(id);
    }
}