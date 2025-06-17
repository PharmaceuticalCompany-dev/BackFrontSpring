import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import {
  FaBars,
  FaHome,
  FaTruck,
  FaUser,
  FaBoxOpen,
  FaCoins,
  
  FaSignOutAlt
} from "react-icons/fa";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { to: "/home", label: "Home", icon: <FaHome /> },
    { to: "/dashboard", label: "Dashboard", icon: <FontAwesomeIcon icon={faChartColumn} /> },
    { to: "/transportadoras", label: "Transportadoras", icon: <FaTruck /> },
    { to: "/funcionarios", label: "Funcionários", icon: <FaUser /> },
    { to: "/estoque", label: "Estoque", icon: <FaBoxOpen /> },
    { to: "/financeiro", label: "Financeiro", icon: <FaCoins /> }
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      {/* Logo e Título */}
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img
            src="assets/images/logoFarmacia.png"
            alt="Logo"
            className={styles.logoImage}
          />
        </div>
        {!collapsed && <h2 className={styles.headerText}>Pharmaceutical</h2>}
      </div>

      {/* Botão de Toggle */}
      <div className={styles.toggleSection}>
        <button onClick={toggleSidebar} className={styles.toggleBtn}>
          <FaBars />
        </button>
      </div>

      {/* Navegação */}
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span className={styles.navText}>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className={styles.logoutSection}>
        <NavLink to="/" className={styles.navLink}>
          <span className={styles.navIcon}><FaSignOutAlt /></span>
          {!collapsed && <span className={styles.navText}>Sair</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
