import React, { useState } from 'react';
import styles from '../assets/css/anunciarItem.module.css';
import RoundedButton from './RoundedButton';

const AnunciarItem = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [imagens, setImagens] = useState([]);
  const [imagemPreview, setImagemPreview] = useState(null); 
  const [error, setError] = useState('');

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantidade(value >= 0 ? value : 0);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImagens = Array.from(files).filter(file => 
        !imagens.some(existingImage => existingImage.name === file.name) // Verifica se o arquivo já existe
      );
      setImagens(prevImagens => [...prevImagens, ...newImagens]);

      // Definir o preview da primeira nova imagem
      if (newImagens.length > 0) {
        setImagemPreview(URL.createObjectURL(newImagens[0])); // Exibe o preview da primeira nova imagem
      }
    }
  };

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    value = (value / 100).toFixed(2);
    setPreco(`R$ ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const precoNumerico = preco.replace("R$ ", "").replace(",", ".");

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('preco', precoNumerico);
    formData.append('categoria', categoria);
    formData.append('quantidade', quantidade);
    imagens.forEach((imagem) => formData.append('imagens', imagem)); // Adiciona todas as imagens

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
      setImagens([]);
      setImagemPreview(null);
      alert('Item anunciado com sucesso!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Anunciar Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
        <div className={styles.imageUpload}>
          <label htmlFor="image-upload" className={styles.placeholderImage}>
            {imagemPreview ? (
              <img src={imagemPreview} alt="Preview do Produto" className={styles.imagemPreview} />
            ) : (
              <span>Adicionar Imagem</span>
            )}
          </label>
          <input
            type="file"
            id="image-upload"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className={styles.fileInput}
            required
          />
          <div className={styles.imagePreviews}>
            {/* Exibe miniaturas sem o primeiro arquivo de preview */}
            {imagens.slice(1).map((imagem, index) => (
              <img 
                key={index} 
                src={URL.createObjectURL(imagem)} 
                alt={`Imagem preview ${index + 1}`} 
                className={styles.imagemPreview}
              />
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nome do Item"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Preço"
            value={preco} 
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Doces">Doces</option>
            <option value="Salgados">Salgados</option>
            <option value="Gelados">Gelados</option>
            <option value="Fitness">Fitness</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={handleQuantityChange}
            required
          />
        </div>
        <RoundedButton text="Anunciar" />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AnunciarItem;
