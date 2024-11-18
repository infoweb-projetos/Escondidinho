import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../assets/css/enviarcodigo.css';
import logo from '../assets/img/logo 1.png';
import RoundedButton from './RoundedButton';
import { auth } from '../firebase.js';
import { sendPasswordResetEmail } from 'firebase/auth';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 
  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Email de redefinição de senha enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      setMessage(`Erro ao enviar e-mail. ${error.message}`);
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
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default RequestReset;
