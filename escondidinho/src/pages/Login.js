import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/login.module.css';
import logo from '../assets/img/logo.png';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import RoundedButton from './RoundedButton';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import SocialLoginButton from './SocialLoginButton';
import { loginUser } from './api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Usuário logado com Google:', result.user);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error.message);
      setError('Erro ao fazer login com Google');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="Escondidinho Logo" />
        </div>
        <form onSubmit={handleLogin}>
          <TextInput
            id="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />
          <div className={styles.remember}>
            <label>
              <input type="checkbox" /> Lembrar de mim
            </label>
          </div>
          <RoundedButton text="Entrar" />
          <div className={styles.socialLogin}>
            <SocialLoginButton onClick={handleGoogleLogin} />
          </div>
          <Link className={styles.forgot} to="/EnviarCodigo">Esqueceu a senha?</Link>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.register}>Sem conta ainda? <Link to="/register" className={styles.registerButton}><strong>Crie logo, cuida cuida!!!</strong></Link></p>
        <p className={styles.protectedInfo}>Seus dados estão protegidos conosco</p>
      </div>
    </div>
  );
};

export default Login;
