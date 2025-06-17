package com.example.farmaciaspring.transportadora.model;

import com.example.farmaciaspring.enums.StatusParceria; // Import o enum de status

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transportadora")
public class Transportadora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String regiao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_parceria", nullable = false)
    private StatusParceria statusParceria;

    public Transportadora() {}

    public Transportadora(String nome, String regiao, StatusParceria statusParceria) {
        this.nome = nome;
        this.regiao = regiao;
        this.statusParceria = statusParceria;
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

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    public StatusParceria getStatusParceria() {
        return statusParceria;
    }

    public void setStatusParceria(StatusParceria statusParceria) {
        this.statusParceria = statusParceria;
    }
}