package com.example.farmaciaspring.funcionario.repository;

import com.example.farmaciaspring.funcionario.model.Funcionario;
import com.example.farmaciaspring.setor.model.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    List<Funcionario> findBySetor(Setor setor);
    List<Funcionario> findBySetorId(Long id);
}