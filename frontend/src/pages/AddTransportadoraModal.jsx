// src/pages/AddTransportadoraModal.jsx
import React, { useState } from 'react';
import styles from '../styles/RegisterProductModal.module.css'; // Reutilizando o estilo dos outros modais

function AddTransportadoraModal({ onClose, onSave }) {
    const [transportadora, setTransportadora] = useState({
        nome: '',
        regiao: '',
        statusParceria: 'Ativo', // <--- CHANGED THIS TO statusParceria
    });

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
        onSave(transportadora);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Adicionar Transportadora</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome da Transportadora</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome" // Make sure 'name' attribute matches state key
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
                            name="regiao" // Make sure 'name' attribute matches state key
                            placeholder="Ex: Sudeste"
                            value={transportadora.regiao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="statusParceria">Status da Parceria</label> {/* <--- CHANGED LABEL */}
                        <select
                            id="statusParceria" // <--- CHANGED ID
                            name="statusParceria" // <--- CHANGED NAME
                            value={transportadora.statusParceria}
                            onChange={handleChange}
                            style={{padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                            required
                        >
                            <option value="ATIVO">Ativa</option>
                            <option value="INATIVO">Inativa</option>
                        </select>
                    </div>
                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTransportadoraModal;