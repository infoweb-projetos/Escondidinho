import React from 'react';
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';

const Login = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
     {/*  <h1>Login</h1> */}
      <form>
        <label htmlFor="email"></label>
        <input type="email" id="email" name="email" required  placeholder='email'/>
        <label htmlFor="password"></label>
        <input type="password" id="password" name="password" required placeholder='senha'/>
        
        <div className="remember-forgot"> 
          <label>  <input  type="checkbox"/> Lembre de mim </label>
          <a href="#"> Esqueceu a senha?</a>
        </div>
        <button type="submit">Entrar</button>
      </form>
      
      
      <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
    </div>
    
  );
};

export default Login;
