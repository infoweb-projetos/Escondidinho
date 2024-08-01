import React from 'react';
import '../assets/css/styles.css';
import logo from '../assets/img/logo_teste.png';

const Register = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" name="password" required />
        
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem uma conta? <a href="/login">Faça login</a></p>
    </div>
  );
};

export default Register;
