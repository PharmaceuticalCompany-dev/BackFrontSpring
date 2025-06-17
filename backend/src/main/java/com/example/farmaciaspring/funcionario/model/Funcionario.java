package com.example.farmaciaspring.funcionario.model;

import com.example.farmaciaspring.enums.Cargo;
import com.example.farmaciaspring.enums.Genero;
import com.example.farmaciaspring.setor.model.Setor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "funcionario")
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genero genero;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Cargo cargo;

    @Column(nullable = false)
    private double salario;

    private double valeRefeicao;
    private double valeAlimentacao;
    private double planoSaude;
    private double planoOdonto;
    private double percentualIrrf;
    private double bonificacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "setor_id")
    @JsonBackReference
    private Setor setor;

    public Funcionario() {}

    public Funcionario(String nome, LocalDate dataNascimento, Genero genero, Cargo cargo, double salario, Setor setor) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.cargo = cargo;
        this.salario = salario;
        this.setor = setor;
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

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public double getValeRefeicao() {
        return valeRefeicao;
    }

    public void setValeRefeicao(double valeRefeicao) {
        this.valeRefeicao = valeRefeicao;
    }

    public double getValeAlimentacao() {
        return valeAlimentacao;
    }

    public void setValeAlimentacao(double valeAlimentacao) {
        this.valeAlimentacao = valeAlimentacao;
    }

    public double getPlanoSaude() {
        return planoSaude;
    }

    public void setPlanoSaude(double planoSaude) {
        this.planoSaude = planoSaude;
    }

    public double getPlanoOdonto() {
        return planoOdonto;
    }

    public void setPlanoOdonto(double planoOdonto) {
        this.planoOdonto = planoOdonto;
    }

    public double getPercentualIrrf() {
        return percentualIrrf;
    }

    public void setPercentualIrrf(double percentualIrrf) {
        this.percentualIrrf = percentualIrrf;
    }

    public double getBonificacao() {
        return bonificacao;
    }

    public void setBonificacao(double bonificacao) {
        this.bonificacao = bonificacao;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    @Transient
    public double getSalarioLiquido() {
        double descontoIrrf = salario * (percentualIrrf / 100.0);

        return salario
                - descontoIrrf
                + valeRefeicao
                + valeAlimentacao
                + bonificacao
                - planoSaude
                - planoOdonto;
    }
}