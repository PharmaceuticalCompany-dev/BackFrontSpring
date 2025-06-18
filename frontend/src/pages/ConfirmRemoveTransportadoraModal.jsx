import React from 'react';
import styles from '../styles/RegisterProductModal.module.css';

function ConfirmRemoveTransportadoraModal({ transportadora, onClose, onConfirm }) {
    if (!transportadora) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Confirmar Remoção</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <div className={styles.form}>
                    <p style={{ fontSize: '1.1rem', textAlign: 'center', margin: '1rem 0' }}>
                        Tem certeza que deseja remover a transportadora <strong style={{ color: 'var(--PRIMARY_TEAL)' }}>{transportadora.nome}</strong>?
                    </p>
                    <p style={{ fontSize: '0.9rem', textAlign: 'center', color: 'var(--TEXT-MUTED)'}}>
                        Esta ação não pode ser desfeita.
                    </p>
                    <div className={styles.formActions} style={{marginTop: '2rem'}}>
                        <button onClick={onClose} className={styles.saveButton} style={{backgroundColor: '#6c757d'}}>
                            Cancelar
                        </button>
                        <button onClick={onConfirm} className={styles.cancelButton}>
                            Confirmar Remoção
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmRemoveTransportadoraModal;