package com.example.farmaciaspring.funcionario.services;

import com.example.farmaciaspring.enums.Cargo;
import com.example.farmaciaspring.enums.TipoSetor;
import com.example.farmaciaspring.funcionario.model.Funcionario;
import com.example.farmaciaspring.funcionario.repository.FuncionarioRepository;
import com.example.farmaciaspring.setor.model.Setor;
import com.example.farmaciaspring.setor.repository.SetorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;
    private final SetorRepository setorRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository, SetorRepository setorRepository) {
        this.funcionarioRepository = funcionarioRepository;
        this.setorRepository = setorRepository;
    }

    private void inicializarFuncionario(Funcionario funcionario) {
        Setor setor = definirOuObterSetorPorCargo(funcionario.getCargo());
        funcionario.setSetor(setor);

        calcularEAtribuirBeneficiosPorCargo(funcionario);

        switch (funcionario.getCargo()) {
            case GERENTE:
                funcionario.setBonificacao(funcionario.getSalario() * 0.10);
                break;
            case ATENDENTE:
                funcionario.setBonificacao(funcionario.getSalario() * 0.02);
                break;
            case RH:
                funcionario.setBonificacao(funcionario.getSalario() * 0.05);
                break;
            case FINANCEIRO:
                funcionario.setBonificacao(funcionario.getSalario() * 0.04);
                break;
            case VENDEDOR:
                funcionario.setBonificacao(funcionario.getSalario() * 0.06);
                break;
            case ALMOXARIFE:
                funcionario.setBonificacao(funcionario.getSalario() * 0.03);
                break;
            case MOTORISTA:
                funcionario.setBonificacao(funcionario.getSalario() * 0.025);
                break;
            default:
                funcionario.setBonificacao(0);
                break;
        }

        calculaIRRF(funcionario);
    }

    public void calculaIRRF(Funcionario funcionario) {
        double salario = funcionario.getSalario();
        double aliquota = 0;
        double deducao = 0;

        if (salario <= 2428.80) {
            aliquota = 0;
            deducao = 0;
        } else if (salario <= 2826.65) {
            aliquota = 7.5;
            deducao = 182.16;
        } else if (salario <= 3751.05) {
            aliquota = 15.0;
            deducao = 394.16;
        } else if (salario <= 4664.68) {
            aliquota = 22.5;
            deducao = 675.49;
        } else {
            aliquota = 27.5;
            deducao = 908.75;
        }

        funcionario.setPercentualIrrf(aliquota);

        double valorIRRF = (salario * (aliquota / 100)) - deducao;
        if (valorIRRF < 0) {
            valorIRRF = 0;
        }
    }

    @Transactional
    public Funcionario adicionarFuncionario(Funcionario funcionario) {
        if (funcionario == null) {
            throw new IllegalArgumentException("Funcionário não pode ser nulo.");
        }
        inicializarFuncionario(funcionario);
        return funcionarioRepository.save(funcionario);
    }

    @Transactional
    public void removerFuncionario(Long id) {
        if (!funcionarioRepository.existsById(id)) {
            throw new RuntimeException("Funcionário com ID " + id + " não encontrado para remoção.");
        }
        funcionarioRepository.deleteById(id);
    }

    @Transactional
    public Funcionario editarFuncionario(Long id, Funcionario novoFuncionario) {
        Optional<Funcionario> funcionarioOptional = funcionarioRepository.findById(id);

        if (funcionarioOptional.isPresent()) {
            Funcionario existente = funcionarioOptional.get();

            existente.setNome(novoFuncionario.getNome());
            existente.setDataNascimento(novoFuncionario.getDataNascimento());
            existente.setGenero(novoFuncionario.getGenero());
            existente.setCargo(novoFuncionario.getCargo());
            existente.setSalario(novoFuncionario.getSalario());
            existente.setValeRefeicao(novoFuncionario.getValeRefeicao());
            existente.setValeAlimentacao(novoFuncionario.getValeAlimentacao());
            existente.setPlanoSaude(novoFuncionario.getPlanoSaude());
            existente.setPlanoOdonto(novoFuncionario.getPlanoOdonto());
            existente.setPercentualIrrf(novoFuncionario.getPercentualIrrf());
            existente.setBonificacao(novoFuncionario.getBonificacao());

            inicializarFuncionario(existente);

            return funcionarioRepository.save(existente);
        }
        return null;
    }

    public List<Funcionario> listarFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public Funcionario buscarPorId(Long id) {
        return funcionarioRepository.findById(id).orElse(null);
    }

    private Setor definirOuObterSetorPorCargo(Cargo cargo) {
        TipoSetor tipoSetor;

        switch (cargo) {
            case GERENTE: tipoSetor = TipoSetor.GERENCIA_FILIAL; break;
            case ATENDENTE: tipoSetor = TipoSetor.ATENDIMENTO_CLIENTE; break;
            case RH: tipoSetor = TipoSetor.GESTAO_PESSOAS; break;
            case FINANCEIRO: tipoSetor = TipoSetor.FINANCEIRO; break;
            case VENDEDOR: tipoSetor = TipoSetor.VENDAS; break;
            case ALMOXARIFE: tipoSetor = TipoSetor.ALMOXARIFADO; break;
            case MOTORISTA: tipoSetor = TipoSetor.TRANSPORTADORAS; break;
            default: throw new IllegalArgumentException("Cargo inválido: " + cargo);
        }

        Optional<Setor> existingSetor = setorRepository.findByTipoSetor(tipoSetor);

        if (existingSetor.isPresent()) {
            return existingSetor.get();
        } else {
            Setor novoSetor = new Setor(tipoSetor);
            return setorRepository.save(novoSetor);
        }
    }

    private void calcularEAtribuirBeneficiosPorCargo(Funcionario funcionario) {
        double valeRefeicao = 300;
        double valeAlimentacao = 300;
        double planoSaude = 300;
        double planoOdonto = 300;

        switch (funcionario.getCargo()) {
            case GERENTE:
                valeRefeicao *= 2;
                valeAlimentacao *= 2;
                planoSaude *= 1.5;
                planoOdonto *= 1.5;
                break;
            case VENDEDOR:
                valeRefeicao *= 1.5;
                valeAlimentacao *= 1.5;
                break;
            case FINANCEIRO:
            case RH:
                planoSaude *= 1.3;
                break;
            case MOTORISTA:
            case ALMOXARIFE:
                valeAlimentacao *= 1.2;
                break;
            case ATENDENTE:
                break;
        }

        funcionario.setValeRefeicao(valeRefeicao);
        funcionario.setValeAlimentacao(valeAlimentacao);
        funcionario.setPlanoSaude(planoSaude);
        funcionario.setPlanoOdonto(planoOdonto);
    }
}