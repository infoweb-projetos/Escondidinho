const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

// Inicializar o Firebase Admin
const serviceAccount = require('./firebase-service-account.json'); // Caminho correto para o JSON da conta de serviço
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

// Função para criar token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token é necessário' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

// Endpoint para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = snapshot.docs[0].data();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = createToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Endpoint para registrar um vendedor
app.post('/register/vendedor', async (req, res) => {
  const { nomevendedor, email, password } = req.body;

  // Log dos dados recebidos
  console.log('Dados recebidos para registro de vendedor:', req.body);

  // Verificação dos campos obrigatórios
  if (!nomevendedor || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name: nomevendedor, email, password: hashedPassword, userType: 'vendedor' };

    const userRef = await db.collection('users').add(newUser);
    res.status(201).json({ id: userRef.id, ...newUser });
  } catch (error) {
    console.error('Erro ao registrar vendedor:', error.message);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});

// Endpoint para registrar um cliente
app.post('/register/cliente', async (req, res) => {
  const { name, email, password } = req.body;

  // Log dos dados recebidos
  console.log('Dados recebidos para registro de cliente:', req.body);

  // Verificação dos campos obrigatórios
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, userType: 'cliente' };

    const userRef = await db.collection('users').add(newUser);
    res.status(201).json({ id: userRef.id, ...newUser });
  } catch (error) {
    console.error('Erro ao registrar cliente:', error.message);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});

// Endpoint para listar itens
app.get('/itens', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('itens').where('userId', '==', req.user.id).get();
    const itens = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(itens);
  } catch (error) {
    console.error('Erro ao buscar itens:', error.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Endpoint para criar anúncio
app.post('/anunciar', verifyToken, async (req, res) => {
  const { nome, descricao, preco, categoria, quantidade } = req.body;

  if (!nome || !descricao || !preco || !categoria || !quantidade) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const newItem = { nome, descricao, preco, categoria, quantidade, userId: req.user.id };
    const itemRef = await db.collection('itens').add(newItem);
    res.status(201).json({ id: itemRef.id, ...newItem });
  } catch (error) {
    console.error('Erro ao cadastrar item:', error.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Middleware para lidar com endpoints não encontrados
app.use((req, res) => {
  console.log('Endpoint não encontrado:', req.method, req.originalUrl);
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
