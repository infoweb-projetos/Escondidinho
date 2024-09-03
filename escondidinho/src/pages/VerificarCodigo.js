import React, { useState } from 'react';
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';

const VerifyCode = () => {
  const [email, setEmail] = useState(''); 
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/VerificarCodigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Código verificado com sucesso. Prossiga para redefinir a senha.');
      } else {
        setError(data.message || 'Código inválido');
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
        <button type="submit">Verificar Código</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default VerifyCode;
