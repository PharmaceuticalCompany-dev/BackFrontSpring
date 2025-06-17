package com.example.farmaciaspring.caixa.services;

import com.example.farmaciaspring.caixa.model.Caixa;
import com.example.farmaciaspring.caixa.repository.CaixaRepository;
import com.example.farmaciaspring.empresa.model.Empresa;
import com.example.farmaciaspring.empresa.repository.EmpresaRepository;
import com.example.farmaciaspring.enums.TipoTransacao;
import com.example.farmaciaspring.funcionario.model.Funcionario;
import com.example.farmaciaspring.funcionario.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CaixaService {

    private final CaixaRepository caixaRepository;
    private final EmpresaRepository empresaRepository;
    private final FuncionarioRepository funcionarioRepository;

    private static final Long EMPRESA_ID_FIXO = 1L;

    @Autowired
    public CaixaService(CaixaRepository caixaRepository,
                        EmpresaRepository empresaRepository,
                        FuncionarioRepository funcionarioRepository) {
        this.caixaRepository = caixaRepository;
        this.empresaRepository = empresaRepository;
        this.funcionarioRepository = funcionarioRepository;
    }

    @Transactional
    public Caixa registrarTransacao(TipoTransacao tipo, double valor, String descricao) {
        if (valor <= 0) {
            throw new IllegalArgumentException("O valor da transação deve ser positivo.");
        }

        Empresa empresa = empresaRepository.findById(EMPRESA_ID_FIXO)
                .orElseThrow(() -> new IllegalStateException("Empresa principal com ID " + EMPRESA_ID_FIXO + " não encontrada."));

        Caixa novaTransacao = new Caixa(tipo, valor, LocalDateTime.now(), descricao);

        if (tipo == TipoTransacao.ENTRADA) {
            empresa.setCaixaTotal(empresa.getCaixaTotal() + valor);
        } else {
            if (empresa.getCaixaTotal() < valor) {
                System.err.println("Atenção: Saldo insuficiente para realizar a saída de caixa. Saldo atual: " + empresa.getCaixaTotal() + ", Valor da saída: " + valor);
            }
            empresa.setCaixaTotal(empresa.getCaixaTotal() - valor);
        }

        empresaRepository.save(empresa);
        return caixaRepository.save(novaTransacao);
    }

    public double getCaixaTotal() {
        Empresa empresa = empresaRepository.findById(EMPRESA_ID_FIXO)
                .orElse(null);
        if (empresa != null) {
            return empresa.getCaixaTotal();
        }
        return 0.0;
    }

    public List<Caixa> listarTransacoes() {
        return caixaRepository.findAll();
    }

    @Transactional
    public void inicializarCaixaEmpresa(double valorInicial) {
        Empresa empresa = empresaRepository.findById(EMPRESA_ID_FIXO)
                .orElseThrow(() -> new IllegalStateException("Empresa principal com ID " + EMPRESA_ID_FIXO + " não encontrada para inicializar o caixa."));
        empresa.setCaixaTotal(valorInicial);
        empresaRepository.save(empresa);
    }

    @Transactional
    public Caixa registrarPagamentoSalarios() {
        List<Funcionario> funcionarios = funcionarioRepository.findAll();
        double totalSalariosBeneficios = 0;
        for (Funcionario f : funcionarios) {
            totalSalariosBeneficios += f.getSalario();
            totalSalariosBeneficios += f.getBonificacao();
            totalSalariosBeneficios += f.getValeRefeicao();
            totalSalariosBeneficios += f.getValeAlimentacao();
        }

        if (totalSalariosBeneficios > 0) {
            return registrarTransacao(TipoTransacao.SAIDA, totalSalariosBeneficios, "Pagamento de salários e benefícios");
        }
        return null;
    }

    @Transactional
    public Caixa registrarCompraDeProdutos(double valorCompra, String descricao) {
        if (valorCompra <= 0) {
            throw new IllegalArgumentException("O valor da compra deve ser positivo.");
        }
        return registrarTransacao(TipoTransacao.SAIDA, valorCompra, descricao);
    }

    @Transactional
    public Caixa registrarVendaDeProdutos(double valorVenda, String descricao) {
        if (valorVenda <= 0) {
            throw new IllegalArgumentException("O valor da venda deve ser positivo.");
        }
        return registrarTransacao(TipoTransacao.ENTRADA, valorVenda, descricao);
    }

    public double calcularEstimativaLucroMensal() { 
        return 0.0;
    }

    public double calcularEstimativaLucroAnual() {
        return 0.0;
    }
}