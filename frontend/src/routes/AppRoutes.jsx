import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Transportadoras from '../pages/Transportadoras';
import Financeiro from '../pages/Financeiro';
import Estoque from '../pages/Estoque'; 
import Funcionarios from '../pages/Funcionarios'; 

import DashboardLayout from '../layouts/DashboardLayout'; // <- O layout que contém a SideBar

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas que NÃO TÊM a sidebar */}
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<Login />} />

      {/* Agrupa todas as rotas que DEVEM TER a sidebar */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transportadoras" element={<Transportadoras />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/estoque" element={<Estoque />} /> 
        <Route path="/funcionarios" element={<Funcionarios />} /> 
      </Route>
    </Routes>
  );
}