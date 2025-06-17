import React, { useState } from 'react';
import styles from '../styles/RegisterProductModal.module.css';

function RemoveProductModal({ onClose, onRemove }) {
    const [productId, setProductId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productId) {
            onRemove(productId);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Remover Produto</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="id">Remover por ID</label>
                        <input
                            type="text"
                            id="id"
                            placeholder="Digite o ID do produto para remover"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className={styles.formGroup}><label>Nome Produto</label><input disabled placeholder="-" /></div>
                    <div className={styles.formGroup}><label>Inserir novo documento</label><input disabled placeholder="-" /></div>
                    <div className={styles.formGroup}><label>Inserir Valor de Venda</label><input disabled placeholder="-" /></div>
                    <div className={styles.formGroup}><label>Inserir Quantidade do Estoque</label><input disabled placeholder="-" /></div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default RemoveProductModal;