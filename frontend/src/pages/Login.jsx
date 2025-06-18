import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import FeedbackModal from '../components/FeedbackModal';
import FormField from '../components/FormField';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // --- NOMES ATUALIZADOS CONFORME SOLICITADO ---
    const [FeedbackModalState, setFeedbackModalState] = useState({
        isOpen: false,
        variant: '',
        title: '',
        message: ''
    });


      useEffect(() => {
          document.title = "Login"; // Define o título específico para esta página
      }, []);
      
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setFeedbackModalState({
                isOpen: true,
                variant: 'success',
                title: 'Sucesso ao realizar login!',
                message: 'Você será redirecionado para a página principal.'
            });
        } else {
            setFeedbackModalState({
                isOpen: true,
                variant: 'error',
                title: 'Falha ao realizar login!',
                message: 'Usuário ou senha inválidos. Por favor, tente novamente.'
            });
        }
    };

    const handleModalClose = () => {
        const isSuccess = FeedbackModalState.variant === 'success';

        setFeedbackModalState({ isOpen: false, variant: '', title: '', message: '' });

        if (isSuccess) {
            navigate('/');
        }
    };

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.logoBox}>
                <img src="/assets/images/logoFarmacia.png" alt="Logo" className={styles.logo} />
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <h1 className={styles.loginTitle}>FAÇA LOGIN</h1>
                    <form onSubmit={handleSubmit}>
                        <FormField
                            id="username"
                            label="Nome de usuário" // O texto que vai animar
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormField
                            id="password"
                            label="Senha" // O texto que vai animar
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className={styles.btn}>Entrar</button>
                    </form>
                    
                </div>
            </div>

            <FeedbackModal
                isOpen={FeedbackModalState.isOpen}
                onClose={handleModalClose}
                variant={FeedbackModalState.variant}
                title={FeedbackModalState.title}
                message={FeedbackModalState.message}
            />
        </div>
    );
}

export default Login;