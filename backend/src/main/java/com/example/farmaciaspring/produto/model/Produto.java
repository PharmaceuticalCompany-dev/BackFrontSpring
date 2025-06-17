package com.example.farmaciaspring.produto.model;
import jakarta.persistence.*;

@Entity
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "preco_compra", nullable = false)
    private double precoCompra;

    @Column(name = "preco_venda", nullable = false)
    private double precoVenda;

    @Column(name = "quantidade_estoque", nullable = false)
    private int quantidadeEstoque;

    public Produto() {}

    public Produto(String nome, double precoCompra, double precoVenda, int quantidadeEstoque) {
        this.nome = nome;
        this.precoCompra = precoCompra;
        this.precoVenda = precoVenda;
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getPrecoCompra() {
        return precoCompra;
    }

    public void setPrecoCompra(double precoCompra) {
        this.precoCompra = precoCompra;
    }

    public double getPrecoVenda() {
        return precoVenda;
    }

    public void setPrecoVenda(double precoVenda) {
        this.precoVenda = precoVenda;
    }

    public int getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(int quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                "\nNome: " + nome +
                "\nPreço compra: " + precoCompra +
                "\nPreço venda: " + precoVenda +
                "\nQuantidade estoque: " + quantidadeEstoque;
    }
}
