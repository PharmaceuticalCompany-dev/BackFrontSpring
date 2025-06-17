package com.example.farmaciaspring.vendasprogramadas.controllers;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.farmaciaspring.vendasprogramadas.model.VendasProgramadas;
import com.example.farmaciaspring.vendasprogramadas.services.VendasProgramadasService;

@RestController
@RequestMapping("/vendasProg")
@CrossOrigin(origins = "*")
public class VendasProgramadasController {

    private final VendasProgramadasService vendasProgramadasService;

    public VendasProgramadasController(VendasProgramadasService vendasProgramadasService) {
        this.vendasProgramadasService = vendasProgramadasService;
    }

    @PostMapping
    public ResponseEntity<VendasProgramadas> adicionarVendaProgramada(@RequestBody VendasProgramadas vendaProgramada) {
        try {
            vendaProgramada.setId(null);
            VendasProgramadas novaVenda = vendasProgramadasService.adicionarVendaProgramada(vendaProgramada);
            return new ResponseEntity<>(novaVenda, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity("Erro interno ao adicionar venda programada: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<VendasProgramadas>> listarVendasProgramadas() {
        List<VendasProgramadas> vendas = vendasProgramadasService.listar();
        return new ResponseEntity<>(vendas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendasProgramadas> buscarVendaProgramadaPorId(@PathVariable Long id) {
        VendasProgramadas venda = vendasProgramadasService.buscarPorId(id);
        if (venda != null) {
            return new ResponseEntity<>(venda, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendasProgramadas> editarVendaProgramada(@PathVariable Long id, @RequestBody VendasProgramadas vendaProgramada) {
        try {
            VendasProgramadas vendaAtualizada = vendasProgramadasService.editarVendaProgramada(id, vendaProgramada);
            return new ResponseEntity<>(vendaAtualizada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity("Erro interno ao editar venda programada: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerVendaProgramada(@PathVariable Long id) {
        boolean removido = vendasProgramadasService.removerVendaProgramada(id);
        if (removido) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{id}/concluir")
    public ResponseEntity<VendasProgramadas> concluirVendaProgramada(@PathVariable Long id) {
        try {
            VendasProgramadas vendaConcluida = vendasProgramadasService.concluirVendaProgramada(id);
            return new ResponseEntity<>(vendaConcluida, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity("Erro interno ao concluir venda programada: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/total-mes-atual")
    public ResponseEntity<Double> somarVendasMesAtual() {
        double total = vendasProgramadasService.somarVendasMesAtual();
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/total-mes")
    public ResponseEntity<Double> somarVendasDoMes(
            @RequestParam int mes,
            @RequestParam int ano) {
        double total = vendasProgramadasService.somarVendasDoMes(mes, ano);
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/estimativa-lucro-anual")
    public ResponseEntity<Double> estimarLucroAnualPorMediaMensal() {
        double estimativa = vendasProgramadasService.estimarLucroAnualPorMediaMensal();
        return new ResponseEntity<>(estimativa, HttpStatus.OK);
    }

    @GetMapping("/custo-anual")
    public ResponseEntity<Double> calcularCustoAnual() {
        double custo = vendasProgramadasService.calcularCustoAnual();
        return new ResponseEntity<>(custo, HttpStatus.OK);
    }

    @GetMapping("/rendimento-anual")
    public ResponseEntity<Double> calcularRendimentoAnual() {
        double rendimento = vendasProgramadasService.calcularRendimentoAnual();
        return new ResponseEntity<>(rendimento, HttpStatus.OK);
    }
}