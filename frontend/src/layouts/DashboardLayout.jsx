import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Layout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet /> {/* As páginas (Dashboard, Transportadoras, etc.) serão renderizadas aqui */}
      </main>
    </div>
  );
};

export default DashboardLayout;