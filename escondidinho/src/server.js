const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

//conexão com o pg
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'escondidinho',
  password: 'orple',
  port: 5432,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const validateLength = (value, maxLength) => value.length <= maxLength;

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
      'INSERT INTO cliente (nomecliente, email, tel, senha) VALUES ($1, $2, $3, $4) RETURNING *',
      [nomecliente, email, tel, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

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
      'INSERT INTO vendedor (nomevendedor, email, tel, senha) VALUES ($1, $2, $3, $4) RETURNING *',
      [nomevendedor, email, tel, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário é um cliente
    const clienteResult = await pool.query('SELECT * FROM cliente WHERE email = $1', [email]);

    if (clienteResult.rows.length > 0) {
      const cliente = clienteResult.rows[0];
      const isMatch = await bcrypt.compare(password, cliente.senha);
      if (isMatch) {
        const token = jwt.sign({ id: cliente.id, tipo: 'cliente' }, 'secreta', { expiresIn: '1h' });
        return res.json({ token });
      }
    }

    const vendedorResult = await pool.query('SELECT * FROM vendedor WHERE email = $1', [email]);

    if (vendedorResult.rows.length > 0) {
      const vendedor = vendedorResult.rows[0];
      const isMatch = await bcrypt.compare(password, vendedor.senha);
      if (isMatch) {
        const token = jwt.sign({ id: vendedor.id, tipo: 'vendedor' }, 'secreta', { expiresIn: '1h' });
        return res.json({ token });
      }
    }

    res.status(400).json({ message: 'Credenciais inválidas' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});