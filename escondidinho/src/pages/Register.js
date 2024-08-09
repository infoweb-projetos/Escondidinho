import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        nome,
        email,
        tel,
        password
      });

      setMessage('Usuário criado com sucesso!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Usuário já cadastrado.');
      } else {
        setMessage('Erro ao criar usuário.');
      }
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome"></label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          placeholder='nome'
        />
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='email'
        />
        <input
          type="tel"
          id="tel"
          name="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
          placeholder='tel/cel'
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='senha'
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder='Confirmar senha'
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
