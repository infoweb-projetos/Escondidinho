import React from 'react';
import styles from '../assets/css/login.module.css';

const TextInput = ({ id, type, placeholder, value, onChange }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
  />
);

export default TextInput;
