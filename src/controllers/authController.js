// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const JWT_SECRET = 'seu-segredo-aqui'; // Coloque seu segredo JWT aqui

const login = (req, res) => {
  const { email, senha } = req.body;

  Usuario.buscarPorEmail(email, (err, usuario) => {
    if (err) return res.status(500).json({ erro: 'Erro interno' });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
      if (err) return res.status(500).json({ erro: 'Erro na comparação da senha' });
      if (!isMatch) return res.status(400).json({ erro: 'Senha incorreta' });

      // Gerar o token JWT
      const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido', token ,status:200});
    });
  });
};

module.exports = { login };
