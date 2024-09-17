import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/login.module.css';
import logo from '../assets/img/logo.png';
import eyeIcon from '../assets/img/eye.png';
import eyeSlashIcon from '../assets/img/eye-slash.png';
import RoundedButton from './RoundedButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="Escondidinho Logo" />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.passwordContainer}>
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
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className={styles.remember}>
            <label>
              <input type="checkbox" /> Lembrar de mim
            </label>
          </div>
          <RoundedButton text="Entrar" />
          <Link className={styles.forgot} to="/EnviarCodigo">Esqueceu a senha?</Link>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.register}>Sem conta ainda? <Link to="/register" className={styles.registerButton}><strong>Crie logo, cuida cuida!!</strong></Link></p>
        <p className={styles.protectedInfo}>Seus dados estão protegidos conosco</p>
      </div>
    </div>
  );
};

export default Login;
