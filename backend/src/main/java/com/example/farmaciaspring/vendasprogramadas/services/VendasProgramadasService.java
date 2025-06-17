package com.example.farmaciaspring.vendasprogramadas.services;

import com.example.farmaciaspring.caixa.services.CaixaService;
import com.example.farmaciaspring.produto.model.Produto;
import com.example.farmaciaspring.produto.repository.ProdutoRepository;
import com.example.farmaciaspring.produto.services.ProdutoService;
import com.example.farmaciaspring.vendasprogramadas.model.VendasProgramadas;
import com.example.farmaciaspring.vendasprogramadas.repository.VendasProgramadasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


@Service
public class VendasProgramadasService {

    private final VendasProgramadasRepository vendasProgramadasRepository;
    private final ProdutoRepository produtoRepository;
    private final CaixaService caixaService;
    private final ProdutoService produtoService;

    @Autowired
    public VendasProgramadasService(VendasProgramadasRepository vendasProgramadasRepository,
                                    ProdutoRepository produtoRepository,
                                    CaixaService caixaService, ProdutoService produtoService) {
        this.vendasProgramadasRepository = vendasProgramadasRepository;
        this.produtoRepository = produtoRepository;
        this.caixaService = caixaService;
        this.produtoService = produtoService;
    }

    @Transactional
    public VendasProgramadas adicionarVendaProgramada(VendasProgramadas vendaProgramada) {
        if (vendaProgramada == null) {
            throw new IllegalArgumentException("Venda programada não pode ser nula.");
        }
        Produto produto = produtoRepository.findById(vendaProgramada.getProdutoId())
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado com ID: " + vendaProgramada.getProdutoId()));

        vendaProgramada.setValorVendaCalculado(produto.getPrecoVenda() * vendaProgramada.getQuantidade());
        vendaProgramada.setCustoProdutoCalculado(produto.getPrecoCompra() * vendaProgramada.getQuantidade());

        return vendasProgramadasRepository.save(vendaProgramada);
    }

    public double somarVendasDoMes(int mes, int ano) {
        double soma = 0.0;
        List<VendasProgramadas> vendas = vendasProgramadasRepository.findAll();
        for (VendasProgramadas venda : vendas) {
            LocalDate data = venda.getDataVenda();
            if (data.getMonthValue() == mes && data.getYear() == ano) {
                soma += venda.getValorVendaCalculado();
            }
        }
        return soma;
    }

    public double somarVendasMesAtual() {
        LocalDate hoje = LocalDate.now();
        return somarVendasDoMes(hoje.getMonthValue(), hoje.getYear());
    }

    public double estimarLucroAnualPorMediaMensal() {
        LocalDate hoje = LocalDate.now();
        int anoAtual = hoje.getYear();
        int mesAtual = hoje.getMonthValue();

        double somaLucroMesesPassados = 0.0;

        for (int mes = 1; mes <= mesAtual; mes++) {
            somaLucroMesesPassados += somarVendasDoMes(mes, anoAtual);
        }

        if (mesAtual == 0) return 0.0;
        double mediaMensal = somaLucroMesesPassados / mesAtual;
        double estimativaLucroAnual = mediaMensal * 12;

        return estimativaLucroAnual;
    }

    @Transactional
    public VendasProgramadas concluirVendaProgramada(Long id) {
        VendasProgramadas venda = vendasProgramadasRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venda programada não encontrada com ID: " + id));

        if (venda.isConcluida()) {
            throw new IllegalStateException("Venda programada já foi concluída.");
        }

        produtoService.diminuirEstoque(venda.getProdutoId(), venda.getQuantidade());

        String descricao = "Venda programada concluída - Produto ID: " + venda.getProdutoId() + ", Quantidade: " + venda.getQuantidade();
        caixaService.registrarVendaDeProdutos(venda.getValorVendaCalculado(), descricao);

        venda.setConcluida(true);
        return vendasProgramadasRepository.save(venda);
    }

    @Transactional
    public boolean removerVendaProgramada(Long id) {
        if (!vendasProgramadasRepository.existsById(id)) {
            return false;
        }
        vendasProgramadasRepository.deleteById(id);
        return true;
    }

    @Transactional
    public VendasProgramadas editarVendaProgramada(Long id, VendasProgramadas vendaProgramadaAtualizada) {
        VendasProgramadas existente = vendasProgramadasRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venda programada não encontrada com ID: " + id));

        existente.setDataVenda(vendaProgramadaAtualizada.getDataVenda());
        existente.setProdutoId(vendaProgramadaAtualizada.getProdutoId());
        existente.setQuantidade(vendaProgramadaAtualizada.getQuantidade());
        existente.setTransportadoraId(vendaProgramadaAtualizada.getTransportadoraId());
        
        Produto produto = produtoRepository.findById(existente.getProdutoId())
                .orElseThrow(() -> new IllegalArgumentException("Produto associado à venda programada não encontrado com ID: " + existente.getProdutoId()));

        existente.setValorVendaCalculado(produto.getPrecoVenda() * existente.getQuantidade());
        existente.setCustoProdutoCalculado(produto.getPrecoCompra() * existente.getQuantidade());
        existente.setConcluida(vendaProgramadaAtualizada.isConcluida());

        return vendasProgramadasRepository.save(existente);
    }

    public List<VendasProgramadas> listar() {
        return vendasProgramadasRepository.findAll();
    }

    public VendasProgramadas buscarPorId(Long id) {
        return vendasProgramadasRepository.findById(id)
                .orElse(null);
    }

    public double calcularCustoAnual() {
        int anoAtual = LocalDate.now().getYear();
        double custoTotal = 0.0;
        for (VendasProgramadas v : vendasProgramadasRepository.findAll()) {
            if (v.getAno() == anoAtual) {
                custoTotal += v.getCustoProdutoCalculado();
            }
        }
        return custoTotal;
    }

    public double calcularRendimentoAnual() {
        int anoAtual = LocalDate.now().getYear();
        double rendimentoTotal = 0.0;
        for (VendasProgramadas v : vendasProgramadasRepository.findAll()) {
            if (v.getAno() == anoAtual) {
                rendimentoTotal += v.getValorVendaCalculado();
            }
        }
        return rendimentoTotal;
    }
}