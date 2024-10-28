const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  host: '179.190.203.85',
  database: 'escondidinho',
  password: '$ext@6',
  port: 5432,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const validateLength = (value, maxLength) => value.length <= maxLength;
const createToken = (userId, userType) => {
  return jwt.sign({ id: userId, tipo: userType }, 'secreta', { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token é necessário' });

  jwt.verify(token, 'secreta', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

app.post('/register/cliente', async (req, res) => {
  const { nomecliente, email, tel, password } = req.body;

  if (!validateLength(email, 50) || !validateLength(password, 50)) {
    return res.status(400).json({ message: 'Email ou senha excedem 50 caracteres' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO cliente (nomecliente, email, tel, senha, vendedor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nomecliente, email, tel, hashedPassword, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  return cb(null, mimeType && extname);
};

const upload = multer({ storage, fileFilter });

app.post('/anunciar', verifyToken, upload.single('imagem'), async (req, res) => {
  const { nome, descricao, preco, categoria, quantidade } = req.body;
  const precoNumerico = parseFloat(preco.replace('R$', '').replace(',', '.'));
  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const vendedorId = req.user.id;
    const result = await pool.query(
      'INSERT INTO itens (nome, descricao, preco, categoria, quantidade, imagem, vendedor_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome, descricao, precoNumerico, categoria, quantidade, imagem, vendedorId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.get('/itens', verifyToken, async (req, res) => {
  try {
    const vendedorId = req.user.id;
    const result = await pool.query('SELECT * FROM itens WHERE vendedor_id = $1', [vendedorId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
