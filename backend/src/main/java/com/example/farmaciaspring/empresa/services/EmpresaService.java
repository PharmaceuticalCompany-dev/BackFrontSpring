package com.example.farmaciaspring.empresa.services;

import com.example.farmaciaspring.empresa.model.Empresa;
import com.example.farmaciaspring.empresa.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {
    private EmpresaRepository repository;

    @Autowired
    public EmpresaService(EmpresaRepository repository) {
        this.repository = repository;
    }

    public List<Empresa> listarEmpresas() {
        return repository.findAll();
    }

    public Optional<Double> buscarCaixaEmpresa(Long idEmpresa) {
        return repository.findById(idEmpresa).map(Empresa::getCaixaTotal);
    }
}
