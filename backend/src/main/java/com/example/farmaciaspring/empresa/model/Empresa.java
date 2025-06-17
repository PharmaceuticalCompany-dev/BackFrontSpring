package com.example.farmaciaspring.empresa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "empresa")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private double caixaTotal;

    public Empresa() {
    }

    public Empresa(String nome, double caixaTotal) {
        this.nome = nome;
        this.caixaTotal =  caixaTotal;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getCaixaTotal() {
        return caixaTotal;
    }

    public void setCaixaTotal(double caixaTotal) {
        this.caixaTotal = caixaTotal;
    }

    public void setId(Long id) {
        this.id = id;
    }
}