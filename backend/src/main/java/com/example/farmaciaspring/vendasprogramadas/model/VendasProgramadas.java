package com.example.farmaciaspring.vendasprogramadas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "vendas_programadas")
public class VendasProgramadas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_venda", nullable = false)
    private LocalDate dataVenda;

    @Column(name = "produto_id", nullable = false)
    private Long produtoId;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @Column(name = "valor_venda_calculado", nullable = false)
    private double valorVendaCalculado;

    @Column(name = "custo_produto_calculado", nullable = false)
    private double custoProdutoCalculado;

    @Column(nullable = false)
    private boolean concluida;

    @Column(name = "transportadora_id")
    private Long transportadoraId;

    public VendasProgramadas() {
    }

    public VendasProgramadas(LocalDate dataVenda, Long produtoId, Integer quantidade, double valorVendaCalculado, double custoProdutoCalculado, Long transportadoraId) {
        this.dataVenda = dataVenda;
        this.produtoId = produtoId;
        this.quantidade = quantidade;
        this.valorVendaCalculado = valorVendaCalculado;
        this.custoProdutoCalculado = custoProdutoCalculado;
        this.concluida = false;
        this.transportadoraId = transportadoraId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataVenda() {
        return dataVenda;
    }

    public void setDataVenda(LocalDate dataVenda) {
        this.dataVenda = dataVenda;
    }

    public Long getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public double getValorVendaCalculado() {
        return valorVendaCalculado;
    }

    public void setValorVendaCalculado(double valorVendaCalculado) {
        this.valorVendaCalculado = valorVendaCalculado;
    }

    public double getCustoProdutoCalculado() {
        return custoProdutoCalculado;
    }

    public void setCustoProdutoCalculado(double custoProdutoCalculado) {
        this.custoProdutoCalculado = custoProdutoCalculado;
    }

    public boolean isConcluida() {
        return concluida;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    public Long getTransportadoraId() {
        return transportadoraId;
    }

    public void setTransportadoraId(Long transportadoraId) {
        this.transportadoraId = transportadoraId;
    }

    public int getAno() {
        return dataVenda.getYear();
    }
}