import React from 'react';
import styles from '../styles/DashboardCard.module.css';

function DashboardCard({ title, value }) {
  return (
    <div className={styles.card}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default DashboardCard;