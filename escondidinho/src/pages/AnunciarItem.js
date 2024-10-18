import React, { useState } from 'react';
import styles from '../assets/css/anunciarItem.module.css';
import RoundedButton from './RoundedButton';

const AnunciarItem = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/anunciar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, 
        body: JSON.stringify({ nome, descricao, preco, categoria, quantidade }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao anunciar o item');
      }

      setNome('');
      setDescricao('');
      setPreco('');
      setCategoria('');
      setQuantidade(0);
      alert('Item anunciado com sucesso!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Anunciar Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Item"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <RoundedButton text="Anunciar" />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AnunciarItem;
