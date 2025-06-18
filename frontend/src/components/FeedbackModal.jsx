import React, { useEffect } from 'react';
import styles from '../styles/FeedbackModal.module.css';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function FeedbackModal({ isOpen, onClose, variant, title, message }) {
  const navigate = useNavigate();


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const Icon = variant === 'success' ? FiCheckCircle : FiXCircle;
  const iconStyle = variant === 'success' ? styles.iconSuccess : styles.iconError;

  const handleOkClick = () => {
    onClose();

    if (variant === 'success') {
      navigate('/home');
    }

  };

  return (
    <div className={styles.modalOverlay} onClick={handleOkClick}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <Icon className={iconStyle} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.closeButton} onClick={handleOkClick}>
          OK
        </button>
      </div>
    </div>
  );
}

export default FeedbackModal;