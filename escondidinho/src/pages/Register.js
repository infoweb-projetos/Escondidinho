import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/register.module.css';
import logo from '../assets/img/logo.png';
import eyeIcon from '../assets/img/eye.png';
import eyeSlashIcon from '../assets/img/eye-slash.png';
import RoundedButton from './RoundedButton';


const Register = ({ role }) => {
  const [nome, setNome] = useState(''); // Nome do vendedor ou cliente
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    const requestBody = {
      nomecliente: role === 'cliente' ? nome : undefined, 
      nomevendedor: role === 'vendedor' ? nome : undefined,
      email,
      tel,
      password,
    };

    console.log("Register request body:", requestBody);

    try {
      const response = await fetch(`http://localhost:5000/register/${role}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
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

  return (
    <div className={styles.fundoRegistro}> 
   
    <div className={styles.container}>
    
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
          style={{
            border: '1px solid var(--primary-color)',
            borderRadius: '50px',
            backgroundColor: '#f9f9f9',
            height: '50px',
          }} />
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input} />
        <input
          type="tel"
          id="tel"
          name="tel"
          required
          placeholder="Tel/Cel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className={styles.input} />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input} />
          <img
            src={showPassword ? eyeSlashIcon : eyeIcon}
            alt="Toggle visibility"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)} />
        </div>
        <div className={styles.passwordContainer}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirm-password"
            required
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input} />
          <img
            src={showConfirmPassword ? eyeSlashIcon : eyeIcon}
            alt="Toggle visibility"
            className={styles.togglePassword}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
        </div>
        <div className={styles.contentBelowPassword}>
          <RoundedButton text="Registrar" />
          {error && <p className={styles.error}>{error}</p>}
          <RoundedButton text="Voltar para Login" onClick={() => navigate('/login')} />
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
