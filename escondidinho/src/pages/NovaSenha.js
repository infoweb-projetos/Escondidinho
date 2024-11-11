import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase'; // Importando o auth do Firebase
import { confirmPasswordReset } from 'firebase/auth';

const NovaSenha = () => {
  const location = useLocation();
  const [oobCode, setOobCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setOobCode(queryParams.get('oobCode')); // Captura o oobCode da URL
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }

    try {
      // Chama a função do Firebase para redefinir a senha
      await confirmPasswordReset(auth, oobCode, newPassword); // Usando o oobCode e a nova senha
      setMessage('Senha redefinida com sucesso!');
    } catch (error) {
      setMessage(`Erro ao redefinir senha: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir Senha</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default NovaSenha;
