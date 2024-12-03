import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Atualizado para importar useNavigate
import styles from '../assets/css/login.module.css';
import logo from '../assets/img/logo 1.svg';
import eyeIcon from '../assets/img/eye.png';
import eyeSlashIcon from '../assets/img/eye-slash.png';
import RoundedButton from './RoundedButton';
import googleIcon from '../assets/img/google-icon.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';


// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Substituímos useHistory por useNavigate

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true'; // Verifica se a opção "Lembrar de mim" foi marcada

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha o e-mail e a senha.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no login');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);

      // Salva o email e senha no localStorage se "Lembrar de mim" estiver marcado
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      navigate('/dashboard'); // Usando navigate para redirecionar
    } catch (err) {
      setError(err.message || 'Erro inesperado');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Usuário logado com Google:', user);

      // Aqui, você pode enviar o token do Google para o backend, se necessário
      const token = await user.getIdToken();
      localStorage.setItem('token', token);

      navigate('/dashboard'); // Usando navigate para redirecionar
    } catch (err) {
      setError('Erro ao fazer login com Google. Tente novamente.');
    }
  };


  return (
    <><div className={styles.header}>
    <img src={logo} alt="logo escondidinho" />
  </div>
<div className={styles.container}>
        <div className={styles.formContainer}>
          
          <form onSubmit={handleLogin}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
              <img
                src={showPassword ? eyeSlashIcon : eyeIcon}
                alt="Toggle visibility"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)} />
            </div>
            <div className={styles.remember}>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} />{' '}
                Lembrar de mim
              </label>
            </div>
            <RoundedButton text="Entrar" />
            <div className={styles.socialLogin}>
              <img
                src={googleIcon}
                alt="Entrar com Google"
                className={styles.googleIcon}
                onClick={handleGoogleLogin} />
            </div>
            <Link className={styles.forgot} to="/EnviarCodigo">Esqueceu a senha?</Link>
            {error && <p className={styles.error}>{error}</p>}
          </form>
          <p className={styles.register}>
            Sem conta ainda?{' '}
            <Link to="/register" className={styles.registerButton}>
              <strong>Crie logo, cuida cuida!!!</strong>
            </Link>
          </p>
          <p className={styles.protectedInfo}>Seus dados estão protegidos conosco</p>
        </div>
      </div></>
    
  );
};

export default Login;
