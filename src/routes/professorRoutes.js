// src/routes/professorRoutes.js
const express = require('express');
const Professor = require('../models/Professor');
const router = express.Router();

router.post('/', (req, res) => {
    const { nome, especialidade } = req.body;
    Professor.criar(nome, especialidade, (err, id) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id, nome, especialidade });
    });
});

router.get('/', (req, res) => {
    Professor.buscarTodos((err, professores) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(professores);
    });
});

router.get('/:id', (req, res) => {
    Professor.buscarPorId(req.params.id, (err, professor) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!professor) return res.status(404).json({ erro: 'Professor não encontrado' });
        res.json(professor);
    });
});

router.delete('/:id', (req, res) => {
    Professor.deletar(req.params.id, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Professor não encontrado' });
        res.status(204).send();
    });
});

// Rota para alterar um professor
router.put('/:id', (req, res) => {
    const { nome, especialidade } = req.body;
    const { id } = req.params;

    Professor.atualizar(id, nome, especialidade, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Professor não encontrado' });
        res.status(200).json({ message: 'Professor atualizado com sucesso' });
    });
});

module.exports = router;
