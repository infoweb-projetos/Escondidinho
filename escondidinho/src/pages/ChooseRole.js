import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedButton from './RoundedButton';
import styles from '../assets/css/chooserole.module.css';
import logo from '../assets/img/logo.png';
import eucompro from '../assets/img/eucompro.svg';
import euvendo from '../assets/img/euvendo.svg';

const ChooseRole = () => {
  const navigate = useNavigate();

  return (

    <div className={styles.container}>
     
      <div className={styles.content}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
        <h2>O que você faz?</h2>
        <div className={styles.blocos}>
        <div className={styles.eucompro}>
        <img src={eucompro} alt="Logo" />
      </div>
      <div className={styles.euvendo}>
        <img src={euvendo} alt="Logo" />
      </div>
      </div>
        <div className={styles.roleButtons}>
        
          <RoundedButton 
            text="Eu compro!" 
            onClick={() => navigate('/register/cliente')} 
          />
          <RoundedButton 
            text="Eu vendo!" 
            onClick={() => navigate('/register/vendedor')} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
