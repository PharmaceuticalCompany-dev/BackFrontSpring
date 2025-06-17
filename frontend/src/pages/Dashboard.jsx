import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css'; // Importa o CSS Module

function Dashboard() {
    const navigate = useNavigate();

      useEffect(() => {
              document.title = "Dashboard - Pharmacom"; // Define o título específico para esta página
          }, []);

    // Dados de exemplo (mantidos para o dashboard)
    const fornecedores = [
        { id: 1, nome: 'Sigma Pharma', contato: 'contato@sigma.com', telefone: '(11) 9876-5432' },
        { id: 2, nome: 'MedGen Laboratórios', contato: 'vendas@medgen.com', telefone: '(21) 1234-5678' },
        { id: 3, nome: 'BioFarm Distribuidora', contato: 'comercial@biofarm.com', telefone: '(31) 5678-9012' },
    ];

    const vendasRecentes = [
        { id: 1, produto: 'Paracetamol 500mg', quantidade: 2, valor: 15.00, data: '2025-06-10 10:05' },
        { id: 2, produto: 'Amoxicilina 875mg', quantidade: 1, valor: 45.50, data: '2025-06-10 09:30' },
        { id: 3, produto: 'Dorflex', quantidade: 3, valor: 28.90, data: '2025-06-09 18:45' },
    ];

    const handleAddFornecedor = () => {
        alert('Funcionalidade para adicionar novo fornecedor.');
    };

    const handleViewAllFornecedores = () => {
        alert('Funcionalidade para ver todos os fornecedores.');
    };

    const handleGenerateReport = () => {
        alert('Gerando relatório de vendas...');
    };

    return (
        <div className={styles.dashboardContainer}>
           

            {/* Conteúdo Principal */}
            <div className={styles.mainContent}>
                {/* Cabeçalho */}
                <header className={styles.headerBar}>
                    <h1>Dashboard da Farmácia</h1>
                    <div className={styles.topBarButtons}>
                        <button onClick={handleGenerateReport} className={styles.reportButton}>Gerar Relatório</button>
                        <div className={styles.userInfo}>
                            Olá, Admin!
                        </div>
                    </div>
                </header>

                {/* Grade de Cards de Métricas */}
                <div className={styles.dashboardGrid}>
                    <div className={styles.dashboardCard}>
                        <h3 className={styles.cardTitle}>Total de Funcionários</h3>
                        <p className={styles.cardValue}>125</p>
                    </div>
                    <div className={styles.dashboardCard}>
                        <h3 className={styles.cardTitle}>Remédios em Estoque</h3>
                        <p className={styles.cardValue}>2.450</p>
                    </div>
                    <div className={styles.dashboardCard}>
                        <h3 className={styles.cardTitle}>Vendas Hoje</h3>
                        <p className={styles.cardValue}>R$ 1.890,00</p>
                    </div>
                    <div className={styles.dashboardCard}>
                        <h3 className={styles.cardTitle}>Produtos Faltando</h3>
                        <p className={styles.cardValue}>12</p>
                    </div>
                </div>

                {/* Seção de Fornecedores */}
                <div className={`${styles.recentActivity} ${styles.sectionCard}`}>
                    <h3 className={styles.sectionTitle}>
                        Últimos Fornecedores
                        <button className={`${styles.actionButton} ${styles.addButton}`} onClick={handleAddFornecedor}>+ Adicionar</button>
                        <button className={`${styles.actionButton} ${styles.viewAllButton}`} onClick={handleViewAllFornecedores}>Ver Todos</button>
                    </h3>
                    {fornecedores.length > 0 ? (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Contato</th>
                                    <th>Telefone</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fornecedores.map(fornecedor => (
                                    <tr key={fornecedor.id}>
                                        <td>{fornecedor.id}</td>
                                        <td>{fornecedor.nome}</td>
                                        <td>{fornecedor.contato}</td>
                                        <td>{fornecedor.telefone}</td>
                                        <td>
                                            <button className={`${styles.actionButton} ${styles.editButton}`}>Editar</button>
                                            <button className={`${styles.actionButton} ${styles.deleteButton}`}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className={styles.noDataMessage}>Nenhum fornecedor cadastrado.</p>
                    )}
                </div>

                {/* Seção de Vendas Recentes / Receitas */}
                <div className={`${styles.recentActivity} ${styles.sectionCard}`}>
                    <h3 className={styles.sectionTitle}>Vendas Recentes / Receitas</h3>
                    {vendasRecentes.length > 0 ? (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>ID Venda</th>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Valor Total</th>
                                    <th>Data/Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendasRecentes.map(venda => (
                                    <tr key={venda.id}>
                                        <td>{venda.id}</td>
                                        <td>{venda.produto}</td>
                                        <td>{venda.quantidade}</td>
                                        <td>R$ {venda.valor.toFixed(2)}</td>
                                        <td>{venda.data}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className={styles.noDataMessage}>Nenhuma venda recente.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;