import React from 'react';
import eyeIcon from '../assets/img/eye.png';
import eyeSlashIcon from '../assets/img/eye-slash.png';
import styles from '../assets/css/login.module.css';

const PasswordInput = ({ value, onChange, showPassword, toggleShowPassword }) => (
  <div className={styles.passwordContainer}>
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Senha"
      value={value}
      onChange={onChange}
      required
    />
    <img
      src={showPassword ? eyeSlashIcon : eyeIcon}
      alt="Toggle visibility"
      className={styles.togglePassword}
      onClick={toggleShowPassword}
    />
  </div>
);

export default PasswordInput;