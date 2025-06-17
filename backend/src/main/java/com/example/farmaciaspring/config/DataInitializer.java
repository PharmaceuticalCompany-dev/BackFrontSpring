package com.example.farmaciaspring.config;

import com.example.farmaciaspring.empresa.model.Empresa;
import com.example.farmaciaspring.empresa.repository.EmpresaRepository;
import com.example.farmaciaspring.enums.Cargo;
import com.example.farmaciaspring.enums.Genero;
import com.example.farmaciaspring.enums.TipoSetor;
import com.example.farmaciaspring.funcionario.model.Funcionario;
import com.example.farmaciaspring.funcionario.repository.FuncionarioRepository;
import com.example.farmaciaspring.funcionario.services.FuncionarioService;
import com.example.farmaciaspring.produto.model.Produto; 
import com.example.farmaciaspring.produto.repository.ProdutoRepository;
import com.example.farmaciaspring.produto.services.ProdutoService;
import com.example.farmaciaspring.setor.model.Setor;
import com.example.farmaciaspring.setor.repository.SetorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;


@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(
            EmpresaRepository empresaRepository,
            SetorRepository setorRepository,
            FuncionarioRepository funcionarioRepository,
            ProdutoRepository produtoRepository,
            FuncionarioService funcionarioService,
            ProdutoService produtoService
    ) {
        return args -> {
            if (empresaRepository.count() == 0) {
                System.out.println("----- Iniciando inicialização de dados de empresas... -----");
                Empresa empresa1 = new Empresa("Pharmacom", 200000.0);
                empresaRepository.save(empresa1);
            }

            if (setorRepository.count() == 0) {
                System.out.println("----- Iniciando inicialização de dados de setores... -----");
                List<Setor> setoresToSave = Arrays.stream(TipoSetor.values())
                        .map(Setor::new)
                        .toList();
                setorRepository.saveAll(setoresToSave);
            }

            if (funcionarioRepository.count() == 0) {
                System.out.println("----- Iniciando inicialização de dados de funcionários... -----");

                funcionarioService.adicionarFuncionario(new Funcionario("Ana Souza", LocalDate.of(1980, 5, 10), Genero.FEMININO, Cargo.GERENTE, 8000.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Bruno Costa", LocalDate.of(1992, 1, 15), Genero.MASCULINO, Cargo.ATENDENTE, 2500.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Carla Martins", LocalDate.of(1995, 8, 20), Genero.FEMININO, Cargo.ATENDENTE, 2400.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Daniel Pereira", LocalDate.of(1990, 3, 25), Genero.MASCULINO, Cargo.ATENDENTE, 2600.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Eduarda Lima", LocalDate.of(1998, 11, 5), Genero.FEMININO, Cargo.ATENDENTE, 2300.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Fernando Rocha", LocalDate.of(1985, 7, 12), Genero.MASCULINO, Cargo.RH, 4500.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Gabriela Dias", LocalDate.of(1993, 2, 28), Genero.FEMININO, Cargo.RH, 4200.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Henrique Silva", LocalDate.of(1988, 9, 17), Genero.MASCULINO, Cargo.RH, 4600.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Isabela Castro", LocalDate.of(1996, 4, 3), Genero.FEMININO, Cargo.RH, 4100.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Juliana Mendes", LocalDate.of(1983, 6, 9), Genero.FEMININO, Cargo.FINANCEIRO, 5000.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Kleber Nunes", LocalDate.of(1991, 10, 1), Genero.MASCULINO, Cargo.FINANCEIRO, 4800.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Larissa Gomes", LocalDate.of(1987, 12, 14), Genero.FEMININO, Cargo.FINANCEIRO, 4900.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Marcos Oliveira", LocalDate.of(1989, 2, 22), Genero.MASCULINO, Cargo.VENDEDOR, 3000.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Natalia Ferreira", LocalDate.of(1994, 7, 7), Genero.FEMININO, Cargo.VENDEDOR, 2900.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Otavio Santos", LocalDate.of(1997, 1, 19), Genero.MASCULINO, Cargo.VENDEDOR, 3100.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Patricia Ribeiro", LocalDate.of(1991, 5, 30), Genero.FEMININO, Cargo.VENDEDOR, 2800.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Thiago Almeida", LocalDate.of(1993, 10, 11), Genero.MASCULINO, Cargo.VENDEDOR, 3200.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Ulisses Barbosa", LocalDate.of(1986, 3, 1), Genero.MASCULINO, Cargo.ALMOXARIFE, 2700.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Viviane Cardoso", LocalDate.of(1990, 9, 26), Genero.FEMININO, Cargo.ALMOXARIFE, 2600.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Wallace Dias", LocalDate.of(1984, 11, 8), Genero.MASCULINO, Cargo.ALMOXARIFE, 2800.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Xavier Fontes", LocalDate.of(1982, 4, 16), Genero.MASCULINO, Cargo.MOTORISTA, 3500.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Yara Gonçalves", LocalDate.of(1993, 6, 21), Genero.FEMININO, Cargo.MOTORISTA, 3400.00, null));
                funcionarioService.adicionarFuncionario(new Funcionario("Zelia Nogueira", LocalDate.of(1989, 12, 4), Genero.FEMININO, Cargo.MOTORISTA, 3600.00, null));
                
                System.out.println("----- 20 funcionários inicializados com sucesso! -----");
            }

            if (produtoRepository.count() == 0) {
                System.out.println("----- Iniciando inicialização de dados de produtos... -----");

                produtoService.adicionarProduto(new Produto("Paracetamol 500mg", 2.50, 5.00, 100));
                produtoService.adicionarProduto(new Produto("Ibuprofeno 400mg", 3.00, 6.50, 75));
                produtoService.adicionarProduto(new Produto("Amoxicilina 500mg", 5.00, 12.00, 50));
                produtoService.adicionarProduto(new Produto("Dipirona 500mg", 2.00, 4.00, 120));
                produtoService.adicionarProduto(new Produto("Creme Hidratante 100g", 8.00, 15.00, 60));
                produtoService.adicionarProduto(new Produto("Protetor Solar FPS30", 12.00, 25.00, 40));
                produtoService.adicionarProduto(new Produto("Shampoo Anticaspa 200ml", 7.00, 14.00, 80));
                produtoService.adicionarProduto(new Produto("Condicionador 200ml", 6.50, 13.00, 90));
                produtoService.adicionarProduto(new Produto("Multivitamínico 60 cápsulas", 15.00, 30.00, 30));
                produtoService.adicionarProduto(new Produto("Álcool em Gel 70% 500ml", 4.00, 8.00, 150));

                System.out.println("----- 10 produtos inicializados com sucesso! -----");
            }
        };
    }
}