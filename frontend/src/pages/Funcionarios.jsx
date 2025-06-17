import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Funcionarios.module.css';

// Importe apenas os modais de adicionar e editar, se ainda for usá-los
import RegisterFuncionarioModal from './RegisterFuncionarioModal';
import EditFuncionarioModal from './EditFuncionarioModal';
// import ConfirmarRemocaoModal from './ConfirmarRemocaoModal'; // REMOVIDO: Não precisamos mais do modal de confirmação

function Funcionarios() {
    const [modal, setModal] = useState({ type: null, data: null });
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8090/funcionarios';

    useEffect(() => {
        document.title = "Funcionários - Pharmacom";
    }, []);

    const fetchFuncionarios = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();

            const formattedData = data.map(func => ({
                id: func.id,
                nome: func.nome,
                genero: func.genero,
                dataNascimento: func.dataNascimento,
                salario: func.salario,
                cargo: func.cargo,
                salarioLiquido: func.salarioLiquido != null ? func.salarioLiquido : 0,
                valeRefeicao: func.valeRefeicao,
                valeAlimentacao: func.valeAlimentacao,
                planoSaude: func.planoSaude,
                planoOdonto: func.planoOdonto,
                percentualIrrf: func.percentualIrrf,
                bonificacao: func.bonificacao,
            }));
            setFuncionarios(formattedData);
        } catch (err) {
            console.error("Erro ao buscar funcionários:", err);
            setError(`Falha ao carregar funcionários: ${err.message}. Verifique a conexão com o servidor e as políticas CORS.`);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchFuncionarios();
    }, [fetchFuncionarios]);

    const openModal = (type, data = null) => setModal({ type, data });
    const closeModal = () => setModal({ type: null, data: null });

    const handleAddFuncionario = async (funcionarioData) => {
        try {
            const funcionarioToSend = {
                nome: funcionarioData.nome,
                dataNascimento: funcionarioData.dataNascimento,
                genero: funcionarioData.genero,
                cargo: funcionarioData.cargo,
                salario: funcionarioData.salario,
                // Ao adicionar, os campos de benefício/desconto podem ser 0 ou nulos por padrão no backend
                valeRefeicao: 0,
                valeAlimentacao: 0,
                planoSaude: 0,
                planoOdonto: 0,
                percentualIrrf: 0,
                bonificacao: 0,
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(funcionarioToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Funcionário adicionado com sucesso!');
            fetchFuncionarios();
            closeModal();
        } catch (err) {
            console.error("Erro ao adicionar funcionário:", err);
            alert(`Erro ao adicionar funcionário: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    };

    const handleEditFuncionario = async (updatedFuncionario) => {
        try {
            // Inclui todos os campos que o backend espera para o PUT
            const funcionarioToSend = {
                id: updatedFuncionario.id,
                nome: updatedFuncionario.nome,
                dataNascimento: updatedFuncionario.dataNascimento,
                genero: updatedFuncionario.genero,
                cargo: updatedFuncionario.cargo,
                salario: updatedFuncionario.salario,
                valeRefeicao: updatedFuncionario.valeRefeicao,
                valeAlimentacao: updatedFuncionario.valeAlimentacao,
                planoSaude: updatedFuncionario.planoSaude,
                planoOdonto: updatedFuncionario.planoOdonto,
                percentualIrrf: updatedFuncionario.percentualIrrf,
                bonificacao: updatedFuncionario.bonificacao,
            };

            const response = await fetch(`${API_URL}/${updatedFuncionario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(funcionarioToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Funcionário editado com sucesso!');
            fetchFuncionarios();
            closeModal();
        } catch (err) {
            console.error("Erro ao editar funcionário:", err);
            alert(`Erro ao editar funcionário: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    };

    // FUNÇÃO DE REMOÇÃO DIRETA
    const handleRemoveFuncionario = async (funcionarioId, funcionarioNome) => {
        // Adiciona uma confirmação simples com alert() antes de remover
        if (!window.confirm(`Tem certeza que deseja remover o funcionário ${funcionarioNome}?`)) {
            return; // Se o usuário cancelar, não faz nada
        }

        try {
            const response = await fetch(`${API_URL}/${funcionarioId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Funcionário removido com sucesso!');
            fetchFuncionarios(); // Atualiza a lista após a remoção
            // Não precisa fechar modal porque não há modal de remoção
        } catch (err) {
            console.error("Erro ao remover funcionário:", err);
            alert(`Erro ao remover funcionário: ${err.message}. Verifique a conexão com o servidor.`);
        }
    };

    const formatCurrency = (value) => {
        const number = parseFloat(value);
        if (isNaN(number) || number === null || number === undefined) return "R$ 0,00";
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        } catch (e) {
            console.error("Erro ao formatar data:", dateString, e);
            return dateString;
        }
    };

    return (
        <div className={styles.funcionarioContainer}>
            <header className={styles.header}>
                <h1>Funcionários</h1>

                <div className={styles.headerActions}>
                    <p>Total de funcionários: {funcionarios.length}</p>
                </div>
                <div className={styles.actionsContainer}>
                    <button className={styles.actionButton} onClick={() => openModal('add')}>Adicionar Funcionário
                    </button>
                </div>


            </header>


            <div className={styles.tableContainer}>
                {loading ? (
                    <p>Carregando funcionários...</p>
                ) : error ? (
                    <p className={styles.errorMessage}>{error}</p>
                ) : funcionarios.length === 0 ? (
                    <p>Nenhum funcionário encontrado. Adicione um novo funcionário!</p>
                ) : (
                    <table className={styles.employeeTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome Completo</th>
                                <th>Gênero</th>
                                <th>Data de Nascimento</th>
                                <th>Cargo</th>
                                <th>Salário Base</th>
                                <th>Salário Líquido</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funcionarios.map((funcionario) => (
                                <tr key={funcionario.id}>
                                    <td>{funcionario.id}</td>
                                    <td>{funcionario.nome}</td>
                                    <td>{funcionario.genero}</td>
                                    <td>{formatDate(funcionario.dataNascimento)}</td>
                                    <td>{funcionario.cargo}</td>
                                    <td>{formatCurrency(funcionario.salario)}</td>
                                    <td>{formatCurrency(funcionario.salarioLiquido)}</td>
                                    <td>
                                        <div className={styles.rowActions}>
                                            <button onClick={() => openModal('edit', funcionario)} className={styles.editRowButton}>Editar</button>
                                            {/* CHAMA A FUNÇÃO DIRETA DE REMOÇÃO */}
                                            <button
                                                onClick={() => handleRemoveFuncionario(funcionario.id, funcionario.nome)}
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

            {/* Renderização condicional dos modais para funcionários. */}
            {modal.type === 'add' && <RegisterFuncionarioModal onClose={closeModal} onSave={handleAddFuncionario} />}
            {modal.type === 'edit' && <EditFuncionarioModal funcionarioToEdit={modal.data} onClose={closeModal} onSave={handleEditFuncionario} />}
            {/* REMOVIDO: Não renderiza mais o modal de remoção */}
            {/* {modal.type === 'remove' && <ConfirmarRemocaoModal item={modal.data} onClose={closeModal} onConfirm={handleRemoveFuncionario} />} */}
        </div>
    );
}

export default Funcionarios;