package com.example.farmaciaspring.empresa.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.farmaciaspring.empresa.services.EmpresaService;

@RestController
@RequestMapping("/empresa")
@CrossOrigin(origins = "*")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping("/{id}/caixa")
    public ResponseEntity<Double> buscarCaixaEmpresa(@PathVariable("id") Long idEmpresa) {
        Optional<Double> caixaTotal = empresaService.buscarCaixaEmpresa(idEmpresa);
        if (caixaTotal.isPresent()) {
            return new ResponseEntity<>(caixaTotal.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
