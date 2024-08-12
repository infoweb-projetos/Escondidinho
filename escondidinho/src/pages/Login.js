import React, { useState } from 'react';
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> dc06856d87ef1988a3e83139e98a9124a33fc6fb
import '../assets/css/styles.css';
import logo from '../assets/img/logo 1.png';
import eyeIcon from '../assets/img/eye.png';
import eyeSlashIcon from '../assets/img/eye-slash.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Erro no login');
      }
    } catch (err) {
      setError('Erro no servidor');
=======


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
>>>>>>> dc06856d87ef1988a3e83139e98a9124a33fc6fb
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
<<<<<<< HEAD
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <div className="remember">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
=======
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
>>>>>>> dc06856d87ef1988a3e83139e98a9124a33fc6fb
        </div>
        <button type="submit">Entrar</button>
        <a className="forgot" href="#">Esqueceu a senha?</a>
        {error && <p className="error">{error}</p>}
      </form>
<<<<<<< HEAD
      <p>Não tem uma conta? <a href="/register" className='register-button'><strong>Cadastre-se</strong></a></p>
=======
      <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
>>>>>>> dc06856d87ef1988a3e83139e98a9124a33fc6fb
    </div>
  );
};


export default Login;