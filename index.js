const express = require('express');
const cors = require('cors');


const conectarAoBancoDeDados = require('./database/conexao'); // Importe a função de conexão
const app = express();
const PORT = 3000;

// Cors Ribera Requisição
app.use(cors());

// Conexão com o banco
conectarAoBancoDeDados();

// Recuperar JSON no Corpo da Requisição 
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API!');
});

// Rota Usuarios
const usuariosRotas = require('./routes/usuarios');

app.use('/usuarios', usuariosRotas);


// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
