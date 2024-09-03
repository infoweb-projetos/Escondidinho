import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/chooserole.css';

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className="choose-role-container">
      <h2>Você é?</h2>
      <div className="role-buttons">
        <button onClick={() => navigate('/register/cliente')}>Cliente</button>
        <button onClick={() => navigate('/register/vendedor')}>Vendedor</button>
      </div>
    </div>
  );
};

export default ChooseRole;
