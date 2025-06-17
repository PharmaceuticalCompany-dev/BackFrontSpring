package com.example.farmaciaspring.setor.services;

import com.example.farmaciaspring.enums.TipoSetor;
import com.example.farmaciaspring.setor.model.Setor;
import com.example.farmaciaspring.setor.repository.SetorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SetorService {

    private final SetorRepository setorRepository;

    public SetorService(SetorRepository setorRepository) {
        this.setorRepository = setorRepository;
    }

    public Setor adicionarSetor(Setor setor) {
        if (setor == null) {
            throw new IllegalArgumentException("Setor não pode ser null.");
        }
        return setorRepository.save(setor);
    }

    public Optional<Setor> buscarSetorPorId(Long id) {
        return setorRepository.findById(id);
    }

    public Optional<Setor> buscarSetorPorTipo(TipoSetor tipoSetor) {
        return setorRepository.findByTipoSetor(tipoSetor);
    }

    public List<Setor> listarTodosSetores() {
        return setorRepository.findAll();
    }

    public Setor atualizarSetor(Long id, Setor setorAtualizado) {
        if (setorAtualizado == null) {
            throw new IllegalArgumentException("Dados do setor atualizado não podem ser null.");
        }
        return setorRepository.findById(id)
                .map(setorExistente -> {
                    setorExistente.setTipoSetor(setorAtualizado.getTipoSetor());
                    return setorRepository.save(setorExistente);
                })
                .orElseThrow(() -> new RuntimeException("Setor com ID " + id + " não encontrado para atualização."));
    }

    public void removerSetor(Long id) {
        if (!setorRepository.existsById(id)) {
            throw new RuntimeException("Setor com ID " + id + " não encontrado para remoção.");
        }
        setorRepository.deleteById(id);
    }
}