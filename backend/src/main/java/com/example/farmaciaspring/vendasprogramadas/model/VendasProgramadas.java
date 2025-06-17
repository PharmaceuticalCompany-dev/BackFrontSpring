package com.example.farmaciaspring.vendasprogramadas.model;

import com.example.farmaciaspring.produto.model.Produto;
import jakarta.persistence.*;
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
    private Long produtoId; // Mantém o ID do produto para consulta

    @Column(name = "valor_venda_calculado", nullable = false)
    private double valorVendaCalculado;

    @Column(name = "custo_produto_calculado", nullable = false)
    private double custoProdutoCalculado;

    @Column(nullable = false)
    private boolean concluida;

    public VendasProgramadas() {}

    public VendasProgramadas(LocalDate dataVenda, Long produtoId, double valorVendaCalculado, double custoProdutoCalculado) {
        this.dataVenda = dataVenda;
        this.produtoId = produtoId;
        this.valorVendaCalculado = valorVendaCalculado;
        this.custoProdutoCalculado = custoProdutoCalculado;
        this.concluida = false;
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

    public int getAno() {
        return dataVenda.getYear();
    }
}