import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { confirmPasswordReset } from 'firebase/auth';
import '../assets/css/NovaSenha.css';

const NovaSenha = () => {
  const location = useLocation();
  const [oobCode, setOobCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setOobCode(queryParams.get('oobCode'));
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Senha redefinida com sucesso!');
    } catch (error) {
      setMessage(`Erro ao redefinir senha: ${error.message}`);
    }
  };

  return (
    <div className="nova-senha-container">
      <div className="form-container">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleResetPassword} className="reset-form">
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Redefinir Senha</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default NovaSenha;
