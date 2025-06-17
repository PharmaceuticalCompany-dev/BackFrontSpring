package com.example.farmaciaspring.transportadora.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.farmaciaspring.transportadora.model.Transportadora;
import com.example.farmaciaspring.transportadora.services.TransportadoraService;

@RestController
@RequestMapping("/transportadoras")
@CrossOrigin(origins = "*")
public class TransportadoraController {

    private final TransportadoraService transportadoraService;

    public TransportadoraController(TransportadoraService transportadoraService) {
        this.transportadoraService = transportadoraService;
    }

    @PostMapping
    public ResponseEntity<Transportadora> adicionarTransportadora(@RequestBody Transportadora transportadora) {
        Transportadora novaTransportadora = transportadoraService.adicionarTransportadora(transportadora);
        return new ResponseEntity<>(novaTransportadora, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Transportadora>> listarTodasTransportadoras() {
        List<Transportadora> transportadoras = transportadoraService.listarTodasTransportadoras();
        return new ResponseEntity<>(transportadoras, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transportadora> buscarTransportadoraPorId(@PathVariable Long id) {
        Optional<Transportadora> transportadora = transportadoraService.buscarTransportadoraPorId(id);
        return transportadora.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transportadora> atualizarTransportadora(@PathVariable Long id, @RequestBody Transportadora transportadoraAtualizada) {
        Transportadora transportadora = transportadoraService.atualizarTransportadora(id, transportadoraAtualizada);
        return new ResponseEntity<>(transportadora, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerTransportadora(@PathVariable Long id) {
        transportadoraService.removerTransportadora(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}