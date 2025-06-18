import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Transportadoras from '../pages/Transportadoras';
import Financeiro from '../pages/Financeiro';
import Estoque from '../pages/Estoque'; 
import Funcionarios from '../pages/Funcionarios'; 

import DashboardLayout from '../layouts/DashboardLayout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/transportadoras" element={<Transportadoras />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/estoque" element={<Estoque />} /> 
        <Route path="/funcionarios" element={<Funcionarios />} /> 
      </Route>
    </Routes>
  );
}