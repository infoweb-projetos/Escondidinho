import React from 'react';
import googleIcon from '../assets/img/google-icon.png';
import styles from '../assets/css/login.module.css';

const SocialLoginButton = ({ onClick }) => (
  <img
    src={googleIcon}
    alt="Entrar com Google"
    className={styles.googleIcon}
    onClick={onClick}
  />
);

export default SocialLoginButton;