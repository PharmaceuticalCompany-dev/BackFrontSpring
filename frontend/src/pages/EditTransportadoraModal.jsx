// src/pages/EditTransportadoraModal.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import styles from '../styles/RegisterProductModal.module.css'; // Reutilizando o estilo

function EditTransportadoraModal({ transportadoraToEdit, onClose, onSave }) {
    // Initialize state with a clone of transportadoraToEdit to avoid direct mutation
    // and ensure you're working with the correct property name.
    const [transportadora, setTransportadora] = useState({
        ...transportadoraToEdit,
        // IMPORTANT: Ensure the status comes in as ATIVO/INATIVO for the select
        // If transportadoraToEdit.statusParceria is "Ativa" or "Inativa" (capitalized first letter)
        // from the parent's fetch, convert it to uppercase here for the select element.
        statusParceria: transportadoraToEdit.statusParceria?.toUpperCase() || '' // Use optional chaining and default to empty string
    });

    // Use useEffect to update internal state if transportadoraToEdit changes (e.g., parent fetches new data)
    // This is good practice for modals that receive props.
    useEffect(() => {
        setTransportadora({
            ...transportadoraToEdit,
            statusParceria: transportadoraToEdit.statusParceria?.toUpperCase() || ''
        });
    }, [transportadoraToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransportadora(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation for required fields
        if (!transportadora.nome || !transportadora.regiao || !transportadora.statusParceria) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        onSave(transportadora); // Pass the updated transportadora object
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Editar Transportadora</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome da Transportadora</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={transportadora.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="regiao">Região Principal</label>
                        <input
                            type="text"
                            id="regiao"
                            name="regiao"
                            value={transportadora.regiao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        {/* CHANGED: htmlFor, id, and name to statusParceria */}
                        <label htmlFor="statusParceria">Status da Parceria</label>
                        <select
                            id="statusParceria"
                            name="statusParceria"
                            value={transportadora.statusParceria} // This state should now correctly hold "ATIVO" or "INATIVO"
                            onChange={handleChange}
                            style={{padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                            required
                        >
                            {/* CHANGED: Option values to ATIVO and INATIVO to match backend enum */}
                            <option value="ATIVO">Ativa</option>
                            <option value="INATIVO">Inativa</option>
                        </select>
                    </div>
                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                        <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTransportadoraModal;