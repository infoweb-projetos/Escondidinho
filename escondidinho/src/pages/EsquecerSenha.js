import React, { useState } from 'react';
import '../assets/css/esquecersenha.css';
import logo from '../assets/img/logo 1.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
  
    const token = new URLSearchParams(window.location.search).get('token'); // Pega o token da URL
  
    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess('Senha atualizada com sucesso!');
      } else {
        setError(data.message || 'Erro ao redefinir a senha');
      }
    } catch (err) {
      setError('Erro no servidor');
    }
  };
  

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          required
          placeholder="Nova Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          placeholder="Confirmar Nova Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Redefinir Senha</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
