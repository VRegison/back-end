// src/routes/categoriaRoutes.js
const express = require('express');
const Categoria = require('../models/Categoria');
const router = express.Router();

// Criar categoria
router.post('/', (req, res) => {
    const { nome, descricao } = req.body;
    Categoria.criar(nome, descricao, (err, id) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id, nome, descricao });
    });
});

// Buscar todas as categorias
router.get('/', (req, res) => {
    Categoria.buscarTodos((err, categorias) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(categorias);
    });
});

// Buscar categoria por ID
router.get('/:id', (req, res) => {
    Categoria.buscarPorId(req.params.id, (err, categoria) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!categoria) return res.status(404).json({ erro: 'Categoria não encontrada' });
        res.json(categoria);
    });
});

// Deletar categoria
router.delete('/:id', (req, res) => {
    Categoria.deletar(req.params.id, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Categoria não encontrada' });
        res.status(204).send();
    });
});

// Atualizar categoria
router.put('/:id', (req, res) => {
    const { nome, descricao } = req.body;
    const { id } = req.params;

    Categoria.atualizar(id, nome, descricao, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Categoria não encontrada' });
        res.status(200).json({ message: 'Categoria atualizada com sucesso' });
    });
});

module.exports = router;
