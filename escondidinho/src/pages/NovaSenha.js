import React, { useState } from 'react';
import styles from '../assets/css/novasenha.module.css'; // Importa o módulo CSS
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
              placeholder="Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirmPassword">Confirmar senha:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmar senha"
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
