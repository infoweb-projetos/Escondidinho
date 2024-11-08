import React, { useState } from 'react';
import styles from '../assets/css/novasenha.module.css'; // Importa o módulo CSS
import logo from '../assets/img/logo.png'; // Ajuste o caminho conforme a sua estrutura de pastas
import cadeado from '../assets/img/cadeado.png';
import mini from '../assets/img/mini.png';
import { useNavigate } from 'react-router-dom';
import RoundedButton from './RoundedButton';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/AtualizarSenha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Senha atualizada com sucesso');
        navigate('/login');
      } else {
        setError(data.message || 'Erro ao atualizar a senha');
      }
    } catch (err) {
      setError('Erro no servidor');
    }
  };


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo Escondidinho" className={styles.logo} />
      </header>
      <div className={styles.formWrapper}>
        <h1>Criar nova senha</h1>
        <div className={styles.iconContainer}>
          <img src={cadeado} alt="Ícone de cadeado" className={styles.icon} />
        </div>
        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="newPassword">Nova senha:</label>
            <input
              type="password"
              id="newPassword"
              name="password"
              required
              placeholder="Nova Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirmPassword">Confirmar senha:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirmar Nova Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Salvar</button>
        </form>
        <footer className={styles.footer}>
          <p><img src={mini} alt="" className={styles.miniIcon} /> Seus dados estão protegidos conosco!</p>
        </footer>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
