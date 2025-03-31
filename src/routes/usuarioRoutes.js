const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.post('/', (req, res) => {
    const { nome, email, senha } = req.body;
    Usuario.criar(nome, email, senha, (err, id) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id, nome, email });
    });
});

router.get('/', (req, res) => {
    Usuario.buscarTodos((err, usuarios) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(usuarios);
    });
});

router.get('/:id', (req, res) => {
    Usuario.buscarPorId(req.params.id, (err, usuario) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(usuario);
    });
});

router.put('/:id', (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.params;

    Usuario.atualizar(id, nome, email, senha, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    });
});

router.delete('/:id', (req, res) => {
    Usuario.deletar(req.params.id, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.status(204).send();
    });
});

module.exports = router;