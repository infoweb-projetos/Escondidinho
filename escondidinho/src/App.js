import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import EsquecerSenha from './pages/EsquecerSenha'; 
import EnviarCodigo from './pages/EnviarCodigo'; 
import VerificarCodigo from './pages/VerificarCodigo'; 
import NovaSenha from './pages/NovaSenha';
import ChooseRole from './pages/ChooseRole';
import RegisterCliente from './pages/RegisterCliente';
import RegisterVendedor from './pages/RegisterVendedor';
import AnunciarItem from './pages/AnunciarItem';
import ListaItens from './pages/ListaItens';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/css/global.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ChooseRole />} />    
        <Route path="/register/cliente" element={<RegisterCliente />} />
        <Route path="/register/vendedor" element={<RegisterVendedor />} />
        <Route path="/EnviarCodigo" element={<EnviarCodigo />} /> 
        <Route path="/VerificarCodigo" element={<VerificarCodigo />} />
        <Route path="/reset-password" element={<NovaSenha />} />
        <Route path="/NovaSenha" element={<NovaSenha />} />
        <Route element={<ProtectedRoute requiredRole="vendedor" />}>
          <Route path="/anunciar" element={<AnunciarItem />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="cliente" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/anuncios" element={<ListaItens />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
