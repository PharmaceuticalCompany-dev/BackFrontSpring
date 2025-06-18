import React from 'react';
import styles from '../styles/RevenueSection.module.css';
import dashboardStyles from '../styles/Dashboard.module.css';

const mockSales = [
    { id: 'S001', product: 'Produto A', quantity: 2, unitPrice: 50.00, total: 100.00, date: '2023-10-26' },
    { id: 'S002', product: 'Produto B', quantity: 1, unitPrice: 120.00, total: 120.00, date: '2023-10-25' },
    { id: 'S003', product: 'Produto C', quantity: 3, unitPrice: 30.00, total: 90.00, date: '2023-10-24' },
];

const mockPurchases = [
    { id: 'P001', item: 'Matéria-prima X', quantity: 10, unitCost: 5.00, total: 50.00, date: '2023-10-20' },
    { id: 'P002', item: 'Embalagens', quantity: 100, unitCost: 0.50, total: 50.00, date: '2023-10-18' },
    { id: 'P003', item: 'Serviço de Frete', quantity: 1, unitCost: 80.00, total: 80.00, date: '2023-10-15' },
];

const RevenueSection = () => {
    const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.total, 0);

    const totalCost = mockPurchases.reduce((sum, purchase) => sum + purchase.total, 0);

    const totalProfit = totalRevenue - totalCost;

    return (
        <div className={dashboardStyles.dashboardContainer}>
            <div className={dashboardStyles.sidebar}>
                <h2 className={dashboardStyles.sidebarHeader}>Farmácia SENAI</h2>
                <nav className={dashboardStyles.sidebarNav}>
                    <ul>
                        <li><a href="#" className={dashboardStyles.navLink}>Visão Geral</a></li>
                        <li><a href="#" className={dashboardStyles.navLink}>Funcionários</a></li>
                        <li><a href="#" className={dashboardStyles.navLink}>Cadastro de Remédios</a></li>
                        <li><a href="#" className={dashboardStyles.navLink}>Estoque</a></li>
                        <li><a href="#" className={dashboardStyles.navLink}>Fornecedores</a></li>
                        <li>
                            <a href="#" className={`${dashboardStyles.navLink} ${dashboardStyles.activeNavLink}`}>
                                Receitas/Vendas
                            </a>
                        </li>
                        <li><a href="#" className={dashboardStyles.navLink}>Transportadoras</a></li>
                        <li><a href="#" className={dashboardStyles.navLink}>Sair</a></li>
                    </ul>
                </nav>
            </div>

            <div className={dashboardStyles.mainContent}>
                <div className={dashboardStyles.headerBar}>
                    <h1>Receitas / Vendas</h1>
                    <div className={dashboardStyles.topBarButtons}>
                        <button className={dashboardStyles.reportButton}>Gerar Relatório Financeiro</button>
                        <span className={dashboardStyles.userInfo}>Olá, Admin!</span>
                    </div>
                </div>

                <div className={styles.revenueContentArea}>
                    <div className={styles.revenueMetricsGrid}>
                        <div className={dashboardStyles.dashboardCard}>
                            <h4 className={dashboardStyles.cardTitle}>Receita Total</h4>
                            <p className={dashboardStyles.cardValue}>R$ {totalRevenue.toFixed(2)}</p>
                        </div>
                        <div className={dashboardStyles.dashboardCard}>
                            <h4 className={dashboardStyles.cardTitle}>Custo Total</h4>
                            <p className={dashboardStyles.cardValue}>R$ {totalCost.toFixed(2)}</p>
                        </div>
                        <div className={dashboardStyles.dashboardCard}>
                            <h4 className={dashboardStyles.cardTitle}>Lucro Total</h4>
                            <p className={`${dashboardStyles.cardValue} ${totalProfit >= 0 ? styles.positiveProfit : styles.negativeProfit}`}>
                                R$ {totalProfit.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className={`${dashboardStyles.recentActivity} ${styles.revenueActivity}`}>
                        <div className={dashboardStyles.sectionHeaderWithControls}>
                            <h3 className={dashboardStyles.sectionTitleText}>Vendas Recentes</h3>
                            <div className={dashboardStyles.sectionTitleButtons}>
                                <button className={`${dashboardStyles.actionButton} ${dashboardStyles.addButton}`} onClick={() => alert('Adicionar Venda')}>+ Adicionar Venda</button>
                                <button className={`${dashboardStyles.actionButton} ${dashboardStyles.viewAllButton}`} onClick={() => alert('Ver Todas as Vendas')}>Ver Todas</button>
                            </div>
                        </div>
                        {mockSales.length > 0 ? (
                            <table className={dashboardStyles.dataTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Produto</th>
                                        <th>Qtd</th>
                                        <th>Preço Unit.</th>
                                        <th>Total</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockSales.map(sale => (
                                        <tr key={sale.id}>
                                            <td>{sale.id}</td>
                                            <td>{sale.product}</td>
                                            <td>{sale.quantity}</td>
                                            <td>R$ {sale.unitPrice.toFixed(2)}</td>
                                            <td>R$ {sale.total.toFixed(2)}</td>
                                            <td>{sale.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={dashboardStyles.noDataMessage}>Nenhuma venda registrada.</p>
                        )}
                    </div>

                    <div className={`${dashboardStyles.recentActivity} ${styles.revenueActivity}`}>
                        <div className={dashboardStyles.sectionHeaderWithControls}>
                            <h3 className={dashboardStyles.sectionTitleText}>Compras Recentes</h3>
                            <div className={dashboardStyles.sectionTitleButtons}>
                                <button className={`${dashboardStyles.actionButton} ${dashboardStyles.addButton}`} onClick={() => alert('Adicionar Compra')}>+ Adicionar Compra</button>
                                <button className={`${dashboardStyles.actionButton} ${dashboardStyles.viewAllButton}`} onClick={() => alert('Ver Todas as Compras')}>Ver Todas</button>
                            </div>
                        </div>
                        {mockPurchases.length > 0 ? (
                            <table className={dashboardStyles.dataTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Item</th>
                                        <th>Qtd</th>
                                        <th>Custo Unit.</th>
                                        <th>Total</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockPurchases.map(purchase => (
                                        <tr key={purchase.id}>
                                            <td>{purchase.id}</td>
                                            <td>{purchase.item}</td>
                                            <td>{purchase.quantity}</td>
                                            <td>R$ {purchase.unitCost.toFixed(2)}</td>
                                            <td>R$ {purchase.total.toFixed(2)}</td>
                                            <td>{purchase.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={dashboardStyles.noDataMessage}>Nenhuma compra registrada.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueSection;