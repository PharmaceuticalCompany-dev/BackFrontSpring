// src/components/FeedbackModal.jsx
import React, { useEffect } from 'react';
import styles from '../styles/FeedbackModal.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function AlertModal({ type = 'success', message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const isSuccess = type === 'success';

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.iconContainer}>
                    {isSuccess ? (
                        <FaCheckCircle className= {`${styles.icon} ${styles.iconSuccess}`} />
                    ) : (
                        <FaTimesCircle className={`${styles.icon} ${styles.iconError}`} />
                    )}
                </div>
                <h2 className={styles.title}>{isSuccess ? 'Sucesso!' : 'Erro!'}</h2>
                <p className={styles.message}>{message}</p>
                <button onClick={onClose} className={styles.closeButton}>
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default AlertModal;
