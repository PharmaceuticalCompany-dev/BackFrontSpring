import React, { useState } from 'react';
import styles from '../styles/RegisterFuncionarioModal.module.css';

function RegisterFuncionarioModal({ onClose, onSave }) {
    const [funcionarioData, setFuncionarioData] = useState({
        id: '',
        nome: '',
        dataNascimento: '',
        genero: '',
        cargo: '',
        salario: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncionarioData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!funcionarioData.id || !funcionarioData.nome || !funcionarioData.dataNascimento || !funcionarioData.genero || !funcionarioData.cargo || !funcionarioData.salario) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const dataToSave = {
            ...funcionarioData,
            salario: parseFloat(funcionarioData.salario.replace(',', '.')) || 0,
        };

        onSave(dataToSave);
    };

    return (
        <div className={styles.modalOverlayFuncionario}>
            <div className={styles.modalContentFuncionario}>
                <div className={styles.modalHeaderFuncionario}>
                    <h2>Adicionar Novo Funcionário</h2>
                    <button onClick={onClose} className={styles.closeButtonFuncionario}>×</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.formFuncionario}>
                    <div className={styles.formGroupFuncionario}>
                        <label htmlFor="ID">ID</label>
                        <input type="number" id="idFuncionario" name="idFuncionario" value={funcionarioData.id} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroupFuncionario}>
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" id="nome" name="nome" value={funcionarioData.nome} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroupFuncionario}>
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input type="date" id="dataNascimento" name="dataNascimento" value={funcionarioData.dataNascimento} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroupFuncionario}>
                        <label htmlFor="genero">Gênero</label>
                        <select id="genero" name="genero" value={funcionarioData.genero} onChange={handleChange} required>
                            <option value="">Selecione...</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMININO">Feminino</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                    </div>

                    <div className={styles.formGroupFuncionario}>
                        <label htmlFor="cargo">Cargo</label>
                        <select id="cargo" name="cargo" value={funcionarioData.cargo} onChange={handleChange} required>
                            <option value="">Selecione...</option>
                            <option value="GERENTE">Gerente</option>
                            <option value="ATENDENTE">Atendente</option>
                            <option value="RH">RH</option>
                            <option value="FINANCEIRO">Financeiro</option>
                            <option value="VENDEDOR">Vendedor</option>
                            <option value="ALMOXARIFE">Almoxarife</option>
                            <option value="MOTORISTA">Motorista</option>
                        </select>
                    </div>

                    <div className={styles.formGroupFuncionario}>
                        <label htmlFor="salario">Salário Base (R$)</label>
                        <input type="number" id="salario" name="salario" step="0.01" placeholder="Ex: 2500.50" value={funcionarioData.salario} onChange={handleChange} required />
                    </div>

                    <div className={styles.formActionsFuncionario}>
                        <button type="button" onClick={onClose} className={styles.cancelButtonFuncionario}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.saveButtonFuncionario}>
                            Adicionar Funcionário
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterFuncionarioModal;