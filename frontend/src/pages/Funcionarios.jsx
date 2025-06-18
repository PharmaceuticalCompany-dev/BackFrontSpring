import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Funcionarios.module.css';

import RegisterFuncionarioModal from './RegisterFuncionarioModal';
import EditFuncionarioModal from './EditFuncionarioModal';
import AlertModal from '../components/AlertModal.jsx';

function Funcionarios() {
    const [modal, setModal] = useState({ type: null, data: null });
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });

    const API_URL = 'http://localhost:8090/funcionarios';

    useEffect(() => {
        document.title = "Funcionários - Pharmacom";
    }, []);

    const fetchFuncionarios = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const data = await response.json();

            const formatted = data.map(func => ({
                ...func,
                salarioLiquido: func.salarioLiquido ?? 0,
            }));
            setFuncionarios(formatted);
        } catch (err) {
            setError(`Erro ao carregar: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchFuncionarios();
    }, [fetchFuncionarios]);

    const openModal = (type, data = null) => setModal({ type, data });
    const closeModal = () => setModal({ type: null, data: null });
    const closeFeedback = () => setFeedback({ show: false, type: '', message: '' });

    const handleAddFuncionario = async (data) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    valeRefeicao: 0,
                    valeAlimentacao: 0,
                    planoSaude: 0,
                    planoOdonto: 0,
                    percentualIrrf: 0,
                    bonificacao: 0,
                }),
            });

            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            setFeedback({ show: true, type: 'success', message: 'Funcionário adicionado!' });
            fetchFuncionarios();
            closeModal();
        } catch (err) {
            setFeedback({ show: true, type: 'error', message: `Erro ao adicionar: ${err.message}` });
        }
    };

    const handleEditFuncionario = async (data) => {
        try {
            const response = await fetch(`${API_URL}/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            setFeedback({ show: true, type: 'success', message: 'Funcionário editado!' });
            fetchFuncionarios();
            closeModal();
        } catch (err) {
            setFeedback({ show: true, type: 'error', message: `Erro ao editar: ${err.message}` });
        }
    };

    const handleRemoveFuncionario = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            setFeedback({ show: true, type: 'success', message: 'Funcionário removido!' });
            fetchFuncionarios();
        } catch (err) {
            setFeedback({ show: true, type: 'error', message: `Erro ao remover: ${err.message}` });
        }
    };

    const formatCurrency = (value) => {
        const number = parseFloat(value);
        if (isNaN(number)) return "R$ 0,00";
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.funcionarioContainer}>
            {/* ===============================================
              ===== INÍCIO DA ÁREA CORRIGIDA NO JSX (HEADER) =====
              ===============================================
            */}
            <header className={styles.header}>
                <h1>Funcionários</h1>

                {/* 1. Contêiner que agrupa todos os elementos da direita */}
                <div className={styles.actionsContainer}>
                    <div className={styles.headerActions}>
                        <p>Total de funcionários: {funcionarios.length}</p>
                    </div>
                    <button className={styles.actionButton} onClick={() => openModal('add')}>
                        + Adicionar Funcionário
                    </button>
                </div>
            </header>
            {/* =============================================
              ===== FIM DA ÁREA CORRIGIDA NO JSX (HEADER) =====
              =============================================
            */}

            <div className={styles.tableContainer}>
                {loading ? (
                    <p>Carregando funcionários...</p>
                ) : error ? (
                    <p className={styles.errorMessage}>{error}</p>
                ) : funcionarios.length === 0 ? (
                    <p>Nenhum funcionário encontrado.</p>
                ) : (
                    <table className={styles.employeeTable}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Gênero</th>
                            <th>Nascimento</th>
                            <th>Cargo</th>
                            <th>Salário Base</th>
                            <th>Salário Líquido</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {funcionarios.map(f => (
                            <tr key={f.id}>
                                <td data-label="ID">{f.id}</td>
                                <td data-label="Nome">{f.nome}</td>
                                <td data-label="Genero">{f.genero}</td>
                                <td data-label="Data de Nascimento">{formatDate(f.dataNascimento)}</td>
                                <td data-label="Cargo">{f.cargo}</td>
                                <td data-label="Salário Bruto">{formatCurrency(f.salario)}</td>
                                <td data-label="Saláio Liquido">{formatCurrency(f.salarioLiquido)}</td>
                                <td data-label="Ações">
                                    <div className={styles.rowActions}>
                                        <button
                                            onClick={() => openModal('edit', f)}
                                            className={styles.editRowButton}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleRemoveFuncionario(f.id)}
                                            className={styles.removeRowButton}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {modal.type === 'add' && (
                <RegisterFuncionarioModal onClose={closeModal} onSave={handleAddFuncionario} />
            )}
            {modal.type === 'edit' && (
                <EditFuncionarioModal funcionarioToEdit={modal.data} onClose={closeModal} onSave={handleEditFuncionario} />
            )}
            {feedback.show && (
                <AlertModal type={feedback.type} message={feedback.message} onClose={closeFeedback} />
            )}
        </div>
    );
}

export default Funcionarios;