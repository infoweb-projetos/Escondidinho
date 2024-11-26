const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');

// Configuração do banco de dados PostgreSQL
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

// Funções auxiliares
const validateLength = (value, maxLength) => value.length <= maxLength;
const createToken = (userId, userType) => {
  return jwt.sign({ id: userId, tipo: userType }, 'secreta', { expiresIn: '1h' });
};

// Middleware para verificação de token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token é necessário' });

  jwt.verify(token, 'secreta', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

// Endpoint de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);

  try {
    // Verifica primeiro na tabela de clientes
    let result = await pool.query('SELECT * FROM cliente WHERE email = $1', [email]);
    let user = result.rows[0];

    // Se não encontrar, verifica na tabela de vendedores
    if (!user) {
      result = await pool.query('SELECT * FROM vendedor WHERE email = $1', [email]);
      user = result.rows[0];
    }

    // Verifica credenciais
    if (!user || !(await bcrypt.compare(password, user.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Criação do token
    const token = createToken(user.id, user.tipo || 'cliente'); // Assume 'cliente' se não houver tipo
    res.json({ token });
  } catch (err) {
    console.error('Erro ao realizar login:', err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Endpoint para registrar um cliente
app.post('/register/cliente', async (req, res) => {
  const { nomecliente, email, tel, password } = req.body;
  console.log("Register attempt with:", { nomecliente, email, tel });

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
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Este email já está registrado' });
    }
    console.error('Erro ao registrar cliente:', err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Endpoint para registrar um vendedor
app.post('/register/vendedor', async (req, res) => {
  const { nomevendedor, email, tel, password } = req.body;
  console.log("Register vendedor attempt with:", { nomevendedor, email, tel });

  if (!validateLength(email, 50) || !validateLength(password, 50)) {
    return res.status(400).json({ message: 'Email ou senha excedem 50 caracteres' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO vendedor (nomevendedor, email, tel, senha) VALUES ($1, $2, $3, $4) RETURNING *',
      [nomevendedor, email, tel, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Este email já está registrado' });
    }
    console.error('Erro ao registrar vendedor:', err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  return cb(null, mimeType && extname);
};

const upload = multer({ storage, fileFilter });

// Endpoint para anunciar um item
app.post('/anunciar', verifyToken, upload.single('imagem'), async (req, res) => {
  const { nome, descricao, preco, categoria, quantidade } = req.body;
  console.log("Anunciar attempt with:", { nome, descricao, preco, categoria, quantidade });

  // Garantindo que o preco é um número
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
    if (err.code === '23503') {
      return res.status(400).json({ message: 'Vendedor não encontrado' });
    }
    console.error('Erro ao cadastrar item:', err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Endpoint para obter itens do vendedor
app.get('/itens', verifyToken, async (req, res) => {
  try {
    const vendedorId = req.user.id;
    const result = await pool.query('SELECT * FROM itens WHERE vendedor_id = $1', [vendedorId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar itens:', err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Serve arquivos estáticos para uploads
app.use('/uploads', express.static(uploadDir));

// Endpoint para iniciar a recuperação de senha
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o usuário existe
    let result = await pool.query('SELECT * FROM cliente WHERE email = $1', [email]);
    let user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Gerar token de recuperação
    const token = jwt.sign({ id: user.id }, 'secreta', { expiresIn: '15m' }); // token com validade de 15 minutos

    // Enviar email com link de recuperação
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    // Lógica para enviar email com a URL acima
    
    res.json({ message: 'Link de recuperação enviado para o seu email' });
  } catch (err) {
    console.error('Erro ao iniciar recuperação de senha:', err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Endpoint para redefinir a senha
// Endpoint para redefinir a senha
app.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verifica o token
    const decoded = jwt.verify(token, 'secreta');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualiza a senha no banco de dados
    const result = await pool.query('UPDATE cliente SET senha = $1 WHERE id = $2 RETURNING *', [hashedPassword, decoded.id]);
    
    if (result.rows.length > 0) {
      console.log(`Senha atualizada para o usuário com ID: ${decoded.id}`);
      res.json({ message: 'Senha redefinida com sucesso' });
    } else {
      console.log(`Usuário com ID ${decoded.id} não encontrado para redefinição de senha.`);
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao redefinir senha:', err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Iniciar servidor
app.listen(5000, () => {
  console.log('Servidor iniciado na porta 5000');
});
