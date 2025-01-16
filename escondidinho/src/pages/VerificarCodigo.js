import React, { useState } from 'react';
import '../assets/css/verificarcodigo.css';
import logo from '../assets/img/logo 1.svg';
import { useNavigate } from 'react-router-dom';
import RoundedButton from './RoundedButton';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/VerificarCodigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/update-password');
      } else {
        setError(data.message || 'Código inválido');
      }
    } catch (err) {
      setError('Erro no servidor');
    }
  };

  return (
    <div className="request-reset-page">
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleVerifyCode}>
        <input
          type="text"
          id="code"
          name="code"
          required
          placeholder="Código de Verificação"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <RoundedButton text="Verificar Código" />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default VerifyCode;
