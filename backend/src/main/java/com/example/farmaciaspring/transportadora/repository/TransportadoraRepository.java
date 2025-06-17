package com.example.farmaciaspring.transportadora.repository;

import com.example.farmaciaspring.transportadora.model.Transportadora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportadoraRepository extends JpaRepository<Transportadora, Long> {
}