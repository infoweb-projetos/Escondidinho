import React, { useState } from 'react';
import '../assets/css/carrinho.css';

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([]);

  const lanches = [
    { id: 1, nome: 'Coxinha', preco: 5, categoria: 'Salgados', imagem: 'https://via.placeholder.com/100' },
    { id: 2, nome: 'Pastel', preco: 6, categoria: 'Salgados', imagem: 'https://via.placeholder.com/100' },
    { id: 3, nome: 'Brownie de Chocolate', preco: 8, categoria: 'Brownies', imagem: 'https://via.placeholder.com/100' },
    { id: 4, nome: 'Doce de Leite', preco: 4, categoria: 'Doces', imagem: 'https://via.placeholder.com/100' },
    { id: 5, nome: 'Brigadeiro Gourmet', preco: 3, categoria: 'Brigadeiros', imagem: 'https://via.placeholder.com/100' },
  ];

  const adicionarAoCarrinho = (id) => {
    setCarrinho((prevCarrinho) => {
      const itemExistente = prevCarrinho.find((item) => item.id === id);

      if (itemExistente) {
        return prevCarrinho.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        const novoItem = lanches.find((lanche) => lanche.id === id);
        return [...prevCarrinho, { ...novoItem, quantidade: 1 }];
      }
    });
  };

  const alterarQuantidade = (id, incremento) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + incremento }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const quantidadeItem = (id) => {
    const item = carrinho.find((item) => item.id === id);
    return item ? item.quantidade : 0;
  };

  const finalizarCompra = () => {
    alert('Compra finalizada com sucesso!');
    setCarrinho([]); // Limpa o carrinho após finalizar
  };

  return (
    <div className="carrinho-container">
      <header className="header">
        <h1>Carrinho de Compras</h1>
      </header>

      <section className="produtos-section">
        <ul className="produtos-lista">
          {lanches.map((lanche) => (
            <li key={lanche.id} className="produto-item">
              <img src={lanche.imagem} alt={lanche.nome} className="produto-imagem" />
              <div className="produto-info">
                <h3>{lanche.nome}</h3>
                <p className="produto-preco">R$ {lanche.preco}</p>
                <p className="produto-categoria">{lanche.categoria}</p>
              </div>
              <div className="botoes-quantidade">
                <button onClick={() => alterarQuantidade(lanche.id, -1)}>-</button>
                <p>{quantidadeItem(lanche.id)}</p>
                <button onClick={() => adicionarAoCarrinho(lanche.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="total-footer">
        <h3>
          Total: R${' '}
          {carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0)}
        </h3>
        <button className="botao-finalizar" onClick={finalizarCompra}>
          Finalizar Compra
        </button>
      </footer>
    </div>
  );
};

export default Carrinho;
