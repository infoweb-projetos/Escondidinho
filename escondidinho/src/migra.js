// Importando as dependências necessárias
const { Client } = require('pg'); // Para conectar ao PostgreSQL
const admin = require('firebase-admin'); // Para interação com o Firebase Firestore
const serviceAccount = require('./firebase-service-account.json'); // Arquivo JSON de credenciais do Firebase

// Inicializando o Firebase Admin SDK com as credenciais
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com', // Substitua pelo URL do seu Firebase
});

// Conectando ao Firestore
const db = admin.firestore();

// Configuração do PostgreSQL
const client = new Client({
  user: 'dev',
  host: 'localhost',
  database: 'escondidinho',
  password: '$uc3ss0',
  port: 5432,
});

client.connect();

// Função para migrar dados de clientes
const migrateClientes = async (client) => {
  const res = await client.query('SELECT * FROM cliente');
  const clientes = res.rows;

  for (const cliente of clientes) {
    const data = {
      nomecliente: cliente.nomecliente,
      email: cliente.email,
      senha: cliente.senha,
      tel: cliente.tel,
      vendedor: cliente.vendedor,
    };

    try {
      await db.collection('clientes').add(data);
      console.log(`Cliente ${cliente.id} migrado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao migrar cliente ${cliente.id}:`, error);
    }
  }
};

// Função para migrar dados de vendedores
const migrateVendedores = async (client) => {
  const res = await client.query('SELECT * FROM vendedor');
  const vendedores = res.rows;

  for (const vendedor of vendedores) {
    const data = {
      nomevendedor: vendedor.nomevendedor,
      email: vendedor.email,
      senha: vendedor.senha,
      tel: vendedor.tel,
      vendedor: vendedor.vendedor,
    };

    try {
      await db.collection('vendedores').add(data);
      console.log(`Vendedor ${vendedor.id} migrado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao migrar vendedor ${vendedor.id}:`, error);
    }
  }
};

// Função para migrar dados de itens
const migrateItens = async (client) => {
  const res = await client.query('SELECT * FROM itens');
  const itens = res.rows;

  for (const item of itens) {
    const data = {
      nome: item.nome,
      descricao: item.descricao,
      quantidade: item.quantidade,
      preco: item.preco,
      vendedor_id: item.vendedor_id,  // Refere-se ao ID do vendedor
      imagem: item.imagem,
      categoria: item.categoria,
    };

    try {
      await db.collection('itens').add(data);
      console.log(`Item ${item.id} migrado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao migrar item ${item.id}:`, error);
    }
  }
};

// Função para migrar dados de produtos
const migrateProdutos = async (client) => {
  const res = await client.query('SELECT * FROM produtos');
  const produtos = res.rows;

  for (const produto of produtos) {
    const data = {
      nome: produto.nome,
      descricao: produto.descricao,
      categoria: produto.categoria,
      preco: produto.preco,
      quantidade: produto.quantidade,
      data_anuncio: produto.data_anuncio,
    };

    try {
      await db.collection('produtos').add(data);
      console.log(`Produto ${produto.id} migrado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao migrar produto ${produto.id}:`, error);
    }
  }
};

// Função principal para executar as migrações
const main = async () => {
  try {
    await migrateClientes(client);
    await migrateVendedores(client);
    await migrateItens(client);
    await migrateProdutos(client);
    console.log("Migração concluída!");
  } catch (error) {
    console.error("Erro durante a migração:", error);
  } finally {
    // Fechar a conexão com o PostgreSQL após a migração
    client.end();
  }
};

// Executando a função principal
main();
