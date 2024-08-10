import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      alert('Login realizado com êxito');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
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
          type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"/>
        <label htmlFor="password"></label>
        <input
          type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Senha"/>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
          <a className="forgot" href="#">Esqueceu a senha?</a>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
    </div>
  );
};


export default Login;