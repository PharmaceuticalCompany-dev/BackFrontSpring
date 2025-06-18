import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styles from '../styles/Transportadoras.module.css';
import { FaSearch } from 'react-icons/fa';
import AddTransportadoraModal from './AddTransportadoraModal';
import EditTransportadoraModal from './EditTransportadoraModal';

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

function Transportadoras() {
    const [transportadoras, setTransportadoras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('Todas');
    const [modal, setModal] = useState({ type: null, data: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8090/transportadoras';

    useEffect(() => {
        document.title = "Transportadoras - Pharmacom";
    }, []);

    // Memoized callbacks for modal control
    const openModal = useCallback((type, data = null) => setModal({ type, data }), []);
    const closeModal = useCallback(() => setModal({ type: null, data: null }), []);

    const fetchTransportadoras = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText || response.statusText}`);
            }
            const data = await response.json();

            const formattedData = data.map(t => ({
                ...t,
                statusParceria: capitalize(t.statusParceria || t.status || ''),
                regiao: capitalize(t.regiao || ''),
            }));
            setTransportadoras(formattedData);
        } catch (err) {
            console.error("Error fetching transportadoras:", err);
            setError(`Falha ao carregar transportadoras: ${err.message}. Verifique a conexão com o servidor e as políticas CORS.`);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchTransportadoras();
    }, [fetchTransportadoras]);

    const filteredTransportadoras = useMemo(() => {
        return transportadoras.filter(t => {
            const matchesSearch = t.nome.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = regionFilter === 'Todas' || t.regiao === regionFilter;
            return matchesSearch && matchesRegion;
        });
    }, [transportadoras, searchTerm, regionFilter]);

    const handleAddTransportadora = useCallback(async (novaTransportadora) => {
        try {
            const transportadoraToSend = {
                nome: novaTransportadora.nome,
                statusParceria: novaTransportadora.statusParceria.toUpperCase(),
                regiao: novaTransportadora.regiao.toUpperCase(),
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transportadoraToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Transportadora adicionada com sucesso!');
            fetchTransportadoras(); // Reload list after addition
            closeModal();
        } catch (err) {
            console.error("Erro ao adicionar transportadora:", err);
            alert(`Erro ao adicionar transportadora: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    }, [API_URL, fetchTransportadoras, closeModal]);

    const handleEditTransportadora = useCallback(async (updatedTransportadora) => {
        try {
            const transportadoraToSend = {
                id: updatedTransportadora.id,
                nome: updatedTransportadora.nome,
                statusParceria: updatedTransportadora.statusParceria.toUpperCase(),
                regiao: updatedTransportadora.regiao.toUpperCase(),
                entregas: updatedTransportadora.entregas,
                atualizacao: updatedTransportadora.atualizacao
            };

            const response = await fetch(`${API_URL}/${updatedTransportadora.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transportadoraToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Transportadora editada com sucesso!');
            fetchTransportadoras();
            closeModal();
        } catch (err) {
            console.error("Erro ao editar transportadora:", err);
            alert(`Erro ao editar transportadora: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    }, [API_URL, fetchTransportadoras, closeModal]);

    const handleRemoveTransportadora = useCallback(async (transportadoraId, transportadoraNome) => {
        if (!window.confirm(`Tem certeza que deseja remover a transportadora ${transportadoraNome}?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${transportadoraId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Transportadora removida com sucesso!');
            fetchTransportadoras();
        } catch (err) {
            console.error("Erro ao remover transportadora:", err);
            alert(`Erro ao remover transportadora: ${err.message}. Verifique a conexão com o servidor.`);
        }
    }, [API_URL, fetchTransportadoras]);

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.header}>Gestão de Transportadoras</h1>

            <div className={styles.actionBar}>
                <div className={styles.searchContainer}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar transportadora"
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filters}>
                    <select
                        className={styles.regionFilter}
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                    >
                        <option value="Todas">Todas as Regiões</option>
                        <option value="Sudeste">Sudeste</option>
                        <option value="Sul">Sul</option>
                        <option value="Nordeste">Nordeste</option>
                        <option value="Centro-Oeste">Centro-Oeste</option>
                        <option value="Norte">Norte</option>
                    </select>
                        <button className={styles.addButton} onClick={() => openModal('add')}>

                           + Adicionar Transportadora
                        </button>

                </div>
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
                    <p>Carregando transportadoras...</p>
                ) : error ? (
                    <p className={styles.errorMessage}>{error}</p>
                ) : filteredTransportadoras.length > 0 ? (
                    <table className={styles.transportadorasTable}>
                        <thead>
                            <tr>
                                <th>Nome da transportadora</th>
                                <th>Status da parceria</th>
                                <th>Região</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransportadoras.map(t => (
                                <tr key={t.id}>
                                    <td>{t.nome}</td>
                                    <td>
                                        <span className={`${styles.statusPill} ${t.statusParceria === 'Ativa' ? styles.statusAtiva : styles.statusInativa}`}>
                                            {t.statusParceria}
                                        </span>
                                    </td>
                                    <td>{t.regiao}</td>
                                    <td>
                                        <div className={styles.rowActions}>
                                            <button onClick={() => openModal('edit', t)} className={styles.editRowButton}>
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleRemoveTransportadora(t.id, t.nome)}
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
                ) : (
                    <div className={styles.emptyState}>Nenhuma transportadora encontrada com os filtros aplicados.</div>
                )}
            </div>

            {modal.type === 'add' && <AddTransportadoraModal onClose={closeModal} onSave={handleAddTransportadora} />}
            {modal.type === 'edit' && <EditTransportadoraModal transportadoraToEdit={modal.data} onClose={closeModal} onSave={handleEditTransportadora} />}
        </div>
    );
}

export default Transportadoras;