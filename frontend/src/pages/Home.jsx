import styles from '../styles/Home.module.css';
import DashboardCard from '../components/DashboardCard';
import FinancialSummary from '../components/FinancialSummary';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        document.title = "Home - Pharmacom";
    }, []);



    return (
        <div className={styles.dashboardContainer}>
            <header>
                <h1 className={styles.mainTitle}>Painel de Controle</h1>
                <p className={styles.subtitle}>Bem-vindo de volta!</p>
            </header>



            <section className={styles.financialSection}>
                <h2 className={styles.sectionTitle}>Resumo Financeiro</h2>
                <FinancialSummary />
            </section>
        </div>
    );
}