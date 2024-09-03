// src/pages/UserTypeSelection.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/styles.css';

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
        <button onClick={() => handleUserTypeSelection('cliente')}>Cliente</button>
        <button onClick={() => handleUserTypeSelection('vendedor')}>Vendedor</button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
