package com.example.farmaciaspring.setor.model;

import com.example.farmaciaspring.enums.TipoSetor;
import com.example.farmaciaspring.funcionario.model.Funcionario;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "setor")
public class Setor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_setor", nullable = false)
    private TipoSetor tipoSetor;

    @OneToMany(mappedBy = "setor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Funcionario> funcionarios = new ArrayList<>();

    public Setor() {}

    public Setor(TipoSetor tipoSetor) {
        this.tipoSetor = tipoSetor;
    }

    public Setor(Long id, TipoSetor tipoSetor, List<Funcionario> funcionarios) {
        this.id = id;
        this.tipoSetor = tipoSetor;
        this.funcionarios = funcionarios;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoSetor getTipoSetor() {
        return tipoSetor;
    }

    public void setTipoSetor(TipoSetor tipoSetor) {
        this.tipoSetor = tipoSetor;
    }

    public List<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }
}