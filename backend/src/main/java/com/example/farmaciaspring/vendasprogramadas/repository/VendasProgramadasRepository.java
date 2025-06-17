package com.example.farmaciaspring.vendasprogramadas.repository;

import com.example.farmaciaspring.vendasprogramadas.model.VendasProgramadas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendasProgramadasRepository extends JpaRepository<VendasProgramadas, Long> {
}
