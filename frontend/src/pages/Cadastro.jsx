import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Cadastro.module.css'; 
import logoFarmacia from '/assets/images/logoFarmacia.png';

import FormField from '../components/FormField';
import FeedbackModal from '../components/FeedbackModal';

export default function Cadastro() {
  const apiUrl = 'http://localhost:8081/farmaciasenai_war/funcionarios';
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({ isOpen: false, variant: '', title: '', message: '' });

  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    dataDeNascimento: '',
    genero: '',
    cargo: '',
    salario: ''
  });

  useEffect(() => {
    listarFuncionarios();
  }, []);

  const listarFuncionarios = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Erro ao carregar a lista de funcionários.');
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error(error);
      setFuncionarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setFeedback({ ...feedback, isOpen: false });
    if (feedback.variant === 'success') {
      listarFuncionarios();
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const funcionarioParaEnviar = {
      id: Number(formData.id),
      nome: formData.nome,
      dataDeNascimento: formData.dataDeNascimento,
      genero: formData.genero.toUpperCase(),
      cargo: formData.cargo.toUpperCase(),
      salario: Number(formData.salario)
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionarioParaEnviar)
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Ocorreu um erro ao cadastrar.');

      setFeedback({
        isOpen: true,
        variant: 'success',
        title: 'Sucesso!',
        message: result.message || 'Funcionário cadastrado com sucesso!'
      });
      setFormData({ id: '', nome: '', dataDeNascimento: '', genero: '', cargo: '', salario: '' });
    } catch (error) {
      setFeedback({
        isOpen: true,
        variant: 'error',
        title: 'Erro no Cadastro',
        message: error.message
      });
    }
  };

  return (
    <div className={styles.cadastroPageContainer}>
      <div className={styles.logoBox}>
        <img src={logoFarmacia} alt="Logo Farmácia SENAI" className={styles.logo} />
      </div>

      <div className={styles.cadastroContainer}>
        <div className={styles.cadastroBox}>

          <div className={styles.listaContainer}>
            <h3>Funcionários Cadastrados</h3>
            <div className={styles.funcionariosList}>
              {loading && <p>Carregando...</p>}
              {!loading && funcionarios.length === 0 && <p>Nenhum funcionário encontrado.</p>}
              {funcionarios.map((f) => (
                <div key={f.id} className={styles.funcionarioItem}>
                  <span>{f.nome} (ID: {f.id})</span>
                  <span>{f.cargo}</span>
                </div>
              ))}
            </div>
          </div>

          <h1 className={styles.cadastroTitle}>Adicionar Funcionário</h1>
          <form onSubmit={handleSubmit}>
            <FormField id="id" label="ID" type="number" value={formData.id} onChange={handleChange} />
            <FormField id="nome" label="Nome Completo" type="text" value={formData.nome} onChange={handleChange} />
            <FormField id="dataDeNascimento" label="Data de Nascimento" type="date" value={formData.dataDeNascimento} onChange={handleChange} />
            
            <div className={styles.formGroup}>
              <select id="genero" name="genero" value={formData.genero} onChange={handleChange} required className={styles.selectInput}>
                <option value="" disabled>Selecione o Gênero</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <select id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required className={styles.selectInput}>
                <option value="" disabled>Selecione o Cargo</option>
                <option value="GERENTE">Gerente</option>
                <option value="VENDEDOR">Vendedor</option>
                <option value="ATENDENTE">Atendente</option>
              </select>
            </div>

            <FormField id="salario" label="Salário (R$)" type="number" value={formData.salario} onChange={handleChange} />

            <button type="submit" className={styles.btn}>Adicionar</button>
          </form>

          <div className={styles.linkText}>
            <p className={styles.hover} onClick={() => navigate('/login')}>
              <span className={styles.link}>Voltar para o Login</span>
            </p>
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={handleModalClose}
        variant={feedback.variant}
        title={feedback.title}
        message={feedback.message}
      />
    </div>
  );
};