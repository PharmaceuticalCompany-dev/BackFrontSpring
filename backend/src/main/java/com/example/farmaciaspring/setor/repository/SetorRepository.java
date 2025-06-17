package com.example.farmaciaspring.setor.repository;

import com.example.farmaciaspring.enums.TipoSetor;
import com.example.farmaciaspring.setor.model.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SetorRepository extends JpaRepository<Setor, Long> {
    Optional<Setor> findByTipoSetor(TipoSetor tipoSetor);
}