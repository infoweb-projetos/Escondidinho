// @DEPRECATED// @DEPRECATED]
// @DEPRECATED
// @DEPRECATED
// @DEPRECATED
// @DEPRECATED
// @DEPRECATED
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/styles.css';
import RoundedButton from './RoundedButton'; // Importe o RoundedButton

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    if (userType === 'cliente') {
      navigate('/register/cliente');
    } else if (userType === 'vendedor') {
      navigate('/register/vendedor');
    }
  };

  return (
    <div className="container">
      <h2>Você é...</h2>
      <div className="button-group">
        {/* Substituindo os botões normais pelo RoundedButton */}
        <RoundedButton text="Cliente" onClick={() => handleUserTypeSelection('cliente')} />
        <RoundedButton text="Vendedor" onClick={() => handleUserTypeSelection('vendedor')} />
      </div>
    </div>
  );
};

export default UserTypeSelection;
