import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import EsquecerSenha from './pages/EsquecerSenha'; 
import Email from './pages/Email'; 
import VerificarCodigo from './pages/VerificarCodigo'; 
import NovaSenha from './pages/NovaSenha';
import ChooseRole from './pages/ChooseRole';
import RegisterCliente from './pages/RegisterCliente';
import RegisterVendedor from './pages/RegisterVendedor';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ChooseRole />} /> {/* Alterando a rota para ChooseRole */}
        <Route path="/register/cliente" element={<RegisterCliente />} />
        <Route path="/register/vendedor" element={<RegisterVendedor />} />
        <Route path="/forgot-password" element={<Email />} /> 
        <Route path="/verify-code" element={<VerificarCodigo />} />
        <Route path="/reset-password" element={<NovaSenha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
