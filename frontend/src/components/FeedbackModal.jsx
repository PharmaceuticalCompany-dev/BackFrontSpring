import React, { useEffect } from 'react'; // 1. Importe o useEffect
import styles from '../styles/FeedbackModal.module.css';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

function FeedbackModal({ isOpen, onClose, variant, title, message }) {
  const navigate = useNavigate(); // Inicialize useNavigate

  // 2. Adicione este useEffect para ouvir a tecla 'Escape'
  useEffect(() => {
    // Função que será chamada quando uma tecla for pressionada
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose(); // Chama a função de fechar o modal
      }
    };

    // Adiciona o listener apenas se o modal estiver aberto
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Função de limpeza: remove o listener quando o modal fecha ou o componente é desmontado
    // Isso é MUITO importante para evitar vazamentos de memória.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]); // Dependências do efeito

  if (!isOpen) {
    return null;
  }
  
  // O resto do seu componente permanece igual...
  const Icon = variant === 'success' ? FiCheckCircle : FiXCircle;
  const iconStyle = variant === 'success' ? styles.iconSuccess : styles.iconError;

   // Função para lidar com o clique no botão OK
  const handleOkClick = () => {
    onClose(); // Primeiro, feche o modal

    // Se o variant for 'success', redirecione para /home
    if (variant === 'success') {
      navigate('/home'); // Redireciona
    }
    // Se não for 'success' (ou for 'error'), apenas o modal será fechado e o usuário permanecerá na página atual.
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