package com.example.farmaciaspring.config;

import com.example.farmaciaspring.empresa.model.Empresa;
import com.example.farmaciaspring.empresa.repository.EmpresaRepository;
import com.example.farmaciaspring.enums.TipoSetor;
import com.example.farmaciaspring.setor.model.Setor;
import com.example.farmaciaspring.setor.repository.SetorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List; // Importar List para saveAll

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(EmpresaRepository empresaRepository, SetorRepository setorRepository) {
        return args -> {
            if (empresaRepository.count() == 0) {
                System.out.println("----- Iniciando inicialização de dados de empresas... -----");

                Empresa empresa1 = new Empresa("Pharmacom", 200000.0); // Use 200000.0 para double
            }

            if (setorRepository.count() == 0) {
                List<Setor> setoresToSave = Arrays.stream(TipoSetor.values())
                        .map(Setor::new)
                        .toList();
                setorRepository.saveAll(setoresToSave);
            }
        };
    }
}