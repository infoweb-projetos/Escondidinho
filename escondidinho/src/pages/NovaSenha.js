import React, { useState } from 'react';
import '../assets/css/novasenha.css';
import logo from '../assets/img/logo.png'; // Ajuste o caminho conforme a sua estrutura de pastas
import cadeado from '../assets/img/cadeado.png';
import mini from '../assets/img/mini.png';

const ResetPassword = () => {
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

    try {
      const response = await fetch('http://localhost:5000/NovaSenha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
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
      <header className="header">
        <img src={logo} alt="Logo Escondidinho" className="logo" />
      </header>
      <div className="form-wrapper">
        <h1>Criar nova senha</h1>
        <div className="icon-container">
          <img src={cadeado} alt="Ícone de cadeado" className="icon" />
        </div>
        <form onSubmit={handleResetPassword} className="form">
          <div className="input-container">
            <label htmlFor="newPassword">Nova senha:</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirmar senha:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Salvar</button>
        </form>
        <footer className="footer">
          <p><img src={mini} alt="" /> Seus dados estão protegidos conosco!</p>
        </footer>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default ResetPassword