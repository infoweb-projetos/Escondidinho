import React, { useState } from 'react';
import eyeIcon from '../assets/img/eye.png';
import eyeSlashIcon from '../assets/img/eye-slash.png';


const PasswordInput = ({ id, value, onChange, placeholder = "Senha" }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const containerStyle = {
      width: '100%',
      position: 'relative',
    };
  
    const inputStyle = {
      width: '100%',
      padding: '15px',
      paddingRight: '40px', // Espaço para o ícone
      margin: '10px 0',
      border: '1px solid var(--primary-color)',
      borderRadius: '50px',
      fontSize: '16px',
      backgroundColor: '#f9f9f9',
      position: 'relative',
      height: '50px',
      outline: 'transparent',
    };
  
    const toggleIconStyle = {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      width: '20px',
      height: '20px',
    };
  
    const iconSrc = showPassword
      ? eyeSlashIcon
      : eyeIcon
  
    return (
      <div style={containerStyle}>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputStyle}
        />
        <img
          src={iconSrc}
          alt="Toggle visibility"
          style={toggleIconStyle}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
    );
  };
  
  export default PasswordInput;
