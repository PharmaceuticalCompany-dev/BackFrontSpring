
import styles from '../styles/Home.module.css';
import DashboardCard from '../components/DashboardCard';
import FinancialSummary from '../components/FinancialSummary';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        document.title = "Home - Pharmacom";
    }, []);

    const dashboardData = [
        { title: 'Total de Funcionários', value: '23' },
        { title: 'Pedidos em Trânsito', value: '45' },
        { title: 'Estoque Atual', value: '1.250 unidades' },
        { title: 'Saldo Atual', value: 'R$ 150.000' }
    ];

    return (
        <div className={styles.dashboardContainer}>
            <header>
                <h1 className={styles.mainTitle}>Painel de Controle</h1>
                <p className={styles.subtitle}>Bem-vindo de volta!</p>
            </header>

            <div className={styles.cardsGrid}>
                {dashboardData.map((data, index) => (
                    <DashboardCard key={index} title={data.title} value={data.value} />
                ))}
            </div>

            <section className={styles.financialSection}>
                <h2 className={styles.sectionTitle}>Resumo Financeiro</h2>
                <FinancialSummary />
            </section>
        </div>
    );
}