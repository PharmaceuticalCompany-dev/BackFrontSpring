import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styles from '../styles/Transportadoras.module.css';
import { FaSearch } from 'react-icons/fa';
import AddTransportadoraModal from './AddTransportadoraModal';
import EditTransportadoraModal from './EditTransportadoraModal';

// Helper function to capitalize the first letter and make the rest lowercase
// This is useful for consistent display of status and region.
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

    // API URL for transportadoras (adjust as per your backend)
    const API_URL = 'http://localhost:8090/transportadoras'; // Example, adjust port/endpoint if needed

    useEffect(() => {
        document.title = "Transportadoras - Pharmacom";
    }, []);

    // Memoized callbacks for modal control
    const openModal = useCallback((type, data = null) => setModal({ type, data }), []);
    const closeModal = useCallback(() => setModal({ type: null, data: null }), []);

    // Function to fetch transportadoras from the backend
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
            
            // Format data for display: capitalize status and region, format date
            const formattedData = data.map(t => ({
                ...t,
                // Prioritize 'statusParceria', fallback to 'status' if needed, then capitalize
                statusParceria: capitalize(t.statusParceria || t.status || ''),
                regiao: capitalize(t.regiao || ''),
                // atualizacao is no longer needed for display, but keeping the line commented out
                // if you ever need to quickly bring it back or for backend debugging.
                // atualizacao: t.atualizacao ? new Date(t.atualizacao).toLocaleDateString('pt-BR') : 'N/A'
            }));
            setTransportadoras(formattedData);
        } catch (err) {
            console.error("Error fetching transportadoras:", err);
            setError(`Falha ao carregar transportadoras: ${err.message}. Verifique a conexão com o servidor e as políticas CORS.`);
        } finally {
            setLoading(false);
        }
    }, [API_URL]); // Dependency on API_URL

    // Fetch data when the component mounts
    useEffect(() => {
        fetchTransportadoras();
    }, [fetchTransportadoras]); // Dependency on fetchTransportadoras

    // Memoized filtered list of transportadoras
    const filteredTransportadoras = useMemo(() => {
        return transportadoras.filter(t => {
            const matchesSearch = t.nome.toLowerCase().includes(searchTerm.toLowerCase());
            // Compare the capitalized region filter ("Sudeste") with the capitalized transportadora region
            const matchesRegion = regionFilter === 'Todas' || t.regiao === regionFilter;
            return matchesSearch && matchesRegion;
        });
    }, [transportadoras, searchTerm, regionFilter]); // Dependencies for memoization

    // Function to add a new transportadora
    const handleAddTransportadora = useCallback(async (novaTransportadora) => {
        try {
            // Ensure status and region are uppercase for the backend enum/string fields
            const transportadoraToSend = {
                nome: novaTransportadora.nome,
                // Ensure the value matches backend enum: "ATIVO" or "INATIVO"
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
    }, [API_URL, fetchTransportadoras, closeModal]); // Dependencies for callback

    // Function to edit an existing transportadora
    const handleEditTransportadora = useCallback(async (updatedTransportadora) => {
        try {
            // Ensure status and region are uppercase for the backend enum/string fields
            const transportadoraToSend = {
                id: updatedTransportadora.id,
                nome: updatedTransportadora.nome,
                // Ensure the value matches backend enum: "ATIVO" or "INATIVO"
                statusParceria: updatedTransportadora.statusParceria.toUpperCase(),
                regiao: updatedTransportadora.regiao.toUpperCase(),
                // Include other fields the backend might expect for PUT
                entregas: updatedTransportadora.entregas,
                // atualizacao is not needed for display, but might be sent to backend if it's part of the entity
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
            fetchTransportadoras(); // Reload list after edit
            closeModal();
        } catch (err) {
            console.error("Erro ao editar transportadora:", err);
            alert(`Erro ao editar transportadora: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    }, [API_URL, fetchTransportadoras, closeModal]); // Dependencies for callback

    // Function to remove a transportadora directly (without a confirmation modal)
    const handleRemoveTransportadora = useCallback(async (transportadoraId, transportadoraNome) => {
        if (!window.confirm(`Tem certeza que deseja remover a transportadora ${transportadoraNome}?`)) {
            return; // If user cancels, do nothing
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
            fetchTransportadoras(); // Reload list after removal
        } catch (err) {
            console.error("Erro ao remover transportadora:", err);
            alert(`Erro ao remover transportadora: ${err.message}. Verifique a conexão com o servidor.`);
        }
    }, [API_URL, fetchTransportadoras]); // Dependencies for callback

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
                                {/* REMOVIDO: <th>Última atualização</th> */}
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
                                    {/* REMOVIDO: <td>{t.atualizacao}</td> */}
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

            {/* Conditional rendering of modals */}
            {modal.type === 'add' && <AddTransportadoraModal onClose={closeModal} onSave={handleAddTransportadora} />}
            {modal.type === 'edit' && <EditTransportadoraModal transportadoraToEdit={modal.data} onClose={closeModal} onSave={handleEditTransportadora} />}
        </div>
    );
}

export default Transportadoras;