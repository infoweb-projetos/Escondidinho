import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      setMessage('Login realizado com sucesso!');
      // Redirecionar ou salvar token JWT se necessário
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('E-mail ou senha incorretos.');
      } else {
        setMessage('Erro ao tentar realizar o login.');
      }
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="senha"
        />

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
          <a className="forgot" href="#">
            Esqueceu a senha?
          </a>
        </div>
        <button type="submit">Entrar</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </p>
    </div>
  );
};

export default Login;
