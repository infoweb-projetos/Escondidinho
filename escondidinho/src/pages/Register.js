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


  const handleSubmit = async (event) => {
    event.preventDefault();
   
    if (password !== confirmPassword) {
      alert('As senhas não são as mesmas!');
      return;
    }


    try {
      const response = await axios.post('http://localhost:5000/register', {
        nome,
        email,
        tel,
        password,
      });
      alert('usuário registrado');
    } catch (error) {
      console.error('erro ao registrar o usuário:', error);
      alert('erro ao registrar o usuário');
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
          type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Nome"/>
               <label htmlFor="email"></label>
        <input
          type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"/>
        <input
          type="tel" id="tel" name="tel" value={tel} onChange={(e) => setTel(e.target.value)} required placeholder="Telefone"/>
        <input
          type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Senha"/>        
        <input
          type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirmar senha"/>        
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};


export default Register;