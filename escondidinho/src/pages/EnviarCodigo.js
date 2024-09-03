import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  

  const handleRequestReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/EnviarCodigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Código de verificação enviado para o seu e-mail.');
        navigate('/verify-code');
      } else {
        setError(data.message || 'Erro ao solicitar redefinição de senha');
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
      <form onSubmit={handleRequestReset}>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar Código</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default RequestReset;
