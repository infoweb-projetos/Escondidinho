import React, { useEffect, useState } from 'react';
import styles from '../assets/css/listaItens.module.css';

const ListaItens = () => {
  const [itens, setItens] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = 'http://localhost:5000/uploads';

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await fetch('http://localhost:5000/itens', {
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

  if (error) {
    return <p>{error}</p>;
  }

  if (itens.length === 0) {
    return <p>Você ainda não anunciou nenhum item.</p>;
  }

  return (
    <div>
      <h2>Lanchinhos 😋</h2>
      <div className={styles.itemList}>
        {itens.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <img
              src={`${baseUrl}/${item.imagem}`}
              alt={item.nome}
              className={styles.itemImage}
            />
            <h3>{item.nome}</h3>
            <p>{item.descricao}</p>
            <p>Preço: R$ {parseFloat(item.preco).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaItens;
