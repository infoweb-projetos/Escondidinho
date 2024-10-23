import React, { useState } from 'react';
import styles from '../assets/css/anunciarItem.module.css';
import RoundedButton from './RoundedButton';

const AnunciarItem = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null); 
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemPreview(URL.createObjectURL(file)); 
  };

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    value = (value / 100).toFixed(2); 
    setPreco(`R$ ${value}`); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('preco', preco);
    formData.append('categoria', categoria);
    formData.append('quantidade', quantidade);
    if (imagem) formData.append('imagem', imagem);

    try {
      const response = await fetch('http://localhost:5000/anunciar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, 
        body: formData,
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
      setImagem(null);
      setImagemPreview(null);
      alert('Item anunciado com sucesso!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Anunciar Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
            
        {!imagemPreview && (
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        )}
       
        {imagemPreview && (
          <img 
            src={imagemPreview} 
            alt="Preview do Produto" 
            className={styles.imagemPreview} 
            onClick={() => document.getElementById('fileInput').click()} 
          />
        )}
      
        <input
          id="fileInput"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
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
          type="text"
          placeholder="Preço"
          value={preco} 
          onChange={handlePriceChange}
          required
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required>
          <option value="">Selecione uma categoria</option>
          <option value="Doces">Doces</option>
          <option value="Salgados">Salgados</option>
          <option value="Gelados">Gelados</option>
          <option value="Fitness">Fitness</option>
        </select>
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
