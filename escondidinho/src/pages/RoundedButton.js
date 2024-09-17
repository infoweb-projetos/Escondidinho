import React from 'react';

const RoundedButton = ({ text, onClick }) => {
  const buttonStyle = {
    maxWidth: '350px',
    padding: '15px',
    backgroundColor: '#FFC4C8',
    color: '#5B4134',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: '20px',
    width: '100%',
    textAlign: 'center',
  };

  const buttonWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };

  return (
    <div style={buttonWrapperStyle}>
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default RoundedButton;
