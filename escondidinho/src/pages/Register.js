import React from 'react';
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';

const Register = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
     {/*  <h1>Login</h1> */}
      <form>
        <label htmlFor="nome"></label>
        <input type="nome" id="nome" name="nome" required  placeholder='nome'/>
        <label htmlFor="email"></label>
        <input type="email" id="email" name="email" required  placeholder='email'/>
        <input type="tel" id="tel" name="tel" required  placeholder='tel/cel'/>
        <input type="password" id="password" name="password" required placeholder='senha'/>
        <input type="password" id="password" name="password" required placeholder='Confirmar senha'/>
       
        <button type="submit">Registrar</button>
      </form>
      
      

    </div>
  );
};

export default Register;
