package com.example.farmaciaspring.caixa.repository;


import com.example.farmaciaspring.caixa.model.Caixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaixaRepository extends JpaRepository<Caixa, Long> {
}
