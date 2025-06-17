import styles from '../styles/Home.module.css'; // Usaremos um novo CSS aqui
import DashboardCard from '../components/DashboardCard'; // Importando o nosso card
import { useEffect } from 'react';

export default function Home() {
  // Dados para os cards (isso pode vir de uma API no futuro)
  useEffect(() => {
          document.title = "Home - Pharmacom"; // Define o título específico para esta página
      }, []);

  const dashboardData = [
    { title: 'Total de Funcionários', value: '120' },
    { title: 'Pedidos em Trânsito', value: '45' },
    { title: 'Estoque Atual', value: '1.250 unidades' },
    { title: 'Saldo Atual', value: 'R$ 150.000' }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header >
        <h1 className={styles.mainTitle}>Painel de Controle</h1>
        <p className={styles.subtitle}>Bem-vindo de volta!</p>
      </header>

      <div className={styles.cardsGrid}>
        {dashboardData.map((data, index) => (
          <DashboardCard key={index} title={data.title} value={data.value} />
        ))}
      </div>
    </div>
  );
}