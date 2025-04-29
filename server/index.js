const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
const produtosRoutes = require('./routes/produtosRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use('/produtos', produtosRoutes);
app.use('/users', usersRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API do Estoque está rodando 🚀');
});

