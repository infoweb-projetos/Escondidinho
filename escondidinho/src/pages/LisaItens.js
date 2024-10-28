import React, { useEffect, useState } from 'react';
import styles from '../assets/css/listaItens.module.css';

const ListaItens = () => {
  const [itens, setItens] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await fetch(`${baseUrl}/itens`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar itens');
        }

        const data = await response.json();
        console.log('Itens recebidos:', data);
        setItens(data);
      } catch (error) {
        console.error('Erro ao carregar os itens:', error);
        setError('Não foi possível carregar os itens.');
      }
    };

    fetchItens();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItens = itens.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Lanchinhos 😋</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <i className={`fas fa-search ${styles.searchIcon}`}></i>
      </div>
      {filteredItens.length === 0 && searchTerm ? (
        <p>Nenhum item encontrado para "{searchTerm}".</p>
      ) : filteredItens.length === 0 ? (
        <p>Você ainda não tem itens anunciados.</p>
      ) : (
        <div className={styles.itemList}>
          {filteredItens.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <img
                src={`${baseUrl}${item.imagem}`}
                alt={item.nome}
                className={styles.itemImage}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src="/caminho/para/imagem/padrao.png";
                }} 
              />
              <h3>{item.nome}</h3>
              <p>{item.descricao}</p>
              <p>Preço: R$ {parseFloat(item.preco).toFixed(2).replace('.', ',')}</p>
              <p>Categoria: {item.categoria}</p>
              <p>Quantidade: {item.quantidade}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaItens;
