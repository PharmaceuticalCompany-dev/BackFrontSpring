package com.example.farmaciaspring.caixa.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.farmaciaspring.caixa.model.Caixa;
import com.example.farmaciaspring.caixa.services.CaixaService;
import com.example.farmaciaspring.enums.TipoTransacao;

@RestController
@RequestMapping("/caixa")
@CrossOrigin(origins = "*")
public class CaixaController {

    private final CaixaService caixaService;

    public CaixaController(CaixaService caixaService) {
        this.caixaService = caixaService;
    }

//aqui usei o RequestParam, ai tem q colcoar na url pra acessar a api
    @PostMapping("/transacao")
    public ResponseEntity<Caixa> registrarTransacao(
            @RequestParam TipoTransacao tipo,
            @RequestParam double valor,
            @RequestParam(required = false) String descricao) {
        try {
            Caixa novaTransacao = caixaService.registrarTransacao(tipo, valor, descricao);
            return new ResponseEntity<>(novaTransacao, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity("Erro interno ao registrar transação: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getCaixaTotal() {
        double totalCaixa = caixaService.getCaixaTotal();
        return new ResponseEntity<>(totalCaixa, HttpStatus.OK);
    }

    @GetMapping("/transacoes")
    public ResponseEntity<List<Caixa>> listarTransacoes() {
        List<Caixa> transacoes = caixaService.listarTransacoes();
        return new ResponseEntity<>(transacoes, HttpStatus.OK);
    }

    @PostMapping("/pagamento-salarios")
    public ResponseEntity<Caixa> registrarPagamentoSalarios() {
        try {
            Caixa transacao = caixaService.registrarPagamentoSalarios();
            if (transacao != null) {
                return new ResponseEntity<>(transacao, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity("Erro interno ao registrar pagamento de salários: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/compra-produtos")
    public ResponseEntity<Caixa> registrarCompraDeProdutos(
            @RequestParam double valorCompra,
            @RequestParam(required = false) String descricao) {
        try {
            Caixa transacao = caixaService.registrarCompraDeProdutos(valorCompra, descricao);
            return new ResponseEntity<>(transacao, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity("Erro interno ao registrar compra de produtos: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/venda-produtos")
    public ResponseEntity<Caixa> registrarVendaDeProdutos(
            @RequestParam double valorVenda,
            @RequestParam(required = false) String descricao) {
        try {
            Caixa transacao = caixaService.registrarVendaDeProdutos(valorVenda, descricao);
            return new ResponseEntity<>(transacao, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity("Erro interno ao registrar venda de produtos: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}