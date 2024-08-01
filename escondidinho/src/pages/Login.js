import React from 'react';
import '../assets/css/styles.css';
import logo from '../assets/img/logo_teste.png';

const Login = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" name="password" required />
        
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
    </div>
  );
};

export default Login;
