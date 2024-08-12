import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import axios from 'axios';
>>>>>>> dc06856d87ef1988a3e83139e98a9124a33fc6fb
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';
import eyeIcon from '../assets/img/eye.png';
import eyeSlashIcon from '../assets/img/eye-slash.png';


const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomecliente: nome, email, tel, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Erro no registro');
      }
    } catch (err) {
      setError('Erro no servidor');
    }
  };

=======


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


>>>>>>> dc06856d87ef1988a3e83139e98a9124a33fc6fb
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
<<<<<<< HEAD
      <form onSubmit={handleRegister}>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          id="tel"
          name="tel"
          required
          placeholder="Tel/Cel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? eyeSlashIcon : eyeIcon}
            alt="Toggle visibility"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirm-password"
            required
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <img
            src={showConfirmPassword ? eyeSlashIcon : eyeIcon}
            alt="Toggle visibility"
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        <div className="content-below-password">
          <button type="submit">Registrar</button>
          {error && <p className="error">{error}</p>}
          <p className="login-link">
            Já tem uma conta? <a href="/login">Voltar para Login</a>
          </p>
        </div>
=======
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
>>>>>>> dc06856d87ef1988a3e83139e98a9124a33fc6fb
      </form>
    </div>
  );
};


export default Register;