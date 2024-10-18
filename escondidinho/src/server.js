const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: '179.190.224.178',
  database: 'escondidinho',
  password: '$ext@6',
  port: 5432,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Função para validar o comprimento das strings
const validateLength = (value, maxLength) => value.length <= maxLength;

// Função para criar um token JWT
const createToken = (userId, userType) => {
  return jwt.sign({ id: userId, tipo: userType }, 'secreta', { expiresIn: '1h' });
};

// Rota para cadastro de cliente
app.post('/register/cliente', async (req, res) => {
  const { nomecliente, email, tel, password } = req.body;

  if (!validateLength(email, 50)) {
    return res.status(400).json({ message: 'O email não pode exceder 50 caracteres' });
  }
  if (!validateLength(password, 50)) {
    return res.status(400).json({ message: 'A senha não pode exceder 50 caracteres' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO cliente (nomecliente, email, tel, senha, vendedor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nomecliente, email, tel, hashedPassword, false] // vendedor é false para clientes
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para cadastro de vendedor
app.post('/register/vendedor', async (req, res) => {
  const { nomevendedor, email, tel, password } = req.body;

  if (!validateLength(email, 50)) {
    return res.status(400).json({ message: 'O email não pode exceder 50 caracteres' });
  }
  if (!validateLength(password, 50)) {
    return res.status(400).json({ message: 'A senha não pode exceder 50 caracteres' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO vendedor (nomevendedor, email, tel, senha, vendedor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nomevendedor, email, tel, hashedPassword, true] // vendedor é true para vendedores
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    // Verificar se o usuário é um cliente
    const clienteResult = await pool.query('SELECT * FROM cliente WHERE email = $1', [email]);

    if (clienteResult.rows.length > 0) {
      const cliente = clienteResult.rows[0];
      const isMatch = await bcrypt.compare(password, cliente.senha);
      if (isMatch) {
        const token = createToken(cliente.id, 'cliente');
        return res.json({ token });
      }
    }

    // Verificar se o usuário é um vendedor
    const vendedorResult = await pool.query('SELECT * FROM vendedor WHERE email = $1', [email]);

    if (vendedorResult.rows.length > 0) {
      const vendedor = vendedorResult.rows[0];
      const isMatch = await bcrypt.compare(password, vendedor.senha);
      if (isMatch) {
        const token = createToken(vendedor.id, 'vendedor');
        return res.json({ token });
      }
    }

    res.status(400).json({ message: 'Credenciais inválidas' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

//rota para anunciar item
app.post('/anunciar', async (req, res) => {
  const { nome, descricao, preco, categoria, quantidade } = req.body;
  
  //verifica se o vendedor está autenticado 
  const vendedorId = req.user.id; 

  try {
    const result = await pool.query(
      'INSERT INTO itens (nome, descricao, preco, categoria, quantidade, vendedor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, descricao, preco, categoria, quantidade, vendedorId]
    );
    res.status(201).json(result.rows[0]); //retorna o item que foi anunciado
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});


// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
