import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedButton from './RoundedButton';
import styles from '../assets/css/chooserole.module.css';

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Você é...?</h2>
        <div className={styles.roleButtons}>
          <RoundedButton 
            text="Cliente" 
            onClick={() => navigate('/register/cliente')} 
          />
          <RoundedButton 
            text="Vendedor" 
            onClick={() => navigate('/register/vendedor')} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
