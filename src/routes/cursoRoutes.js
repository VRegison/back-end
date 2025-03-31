const express = require('express');
const Curso = require('../models/Curso');
const router = express.Router();

// Criar curso
router.post('/', (req, res) => {
    const { titulo, descricao, professor_id, categoria_id, imagem,visualizacoes } = req.body;
    Curso.criar(titulo, descricao, professor_id, categoria_id, imagem,visualizacoes, (err, id) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id, titulo, descricao, professor_id, categoria_id, imagem ,visualizacoes});
    });
});

// Buscar todos os cursos
router.get('/', (req, res) => {
    Curso.buscarTodos((err, cursos) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(cursos);
    });
});

// Buscar curso por ID e incrementar visualizações
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Curso.buscarPorId(id, (err, curso) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
        
        // Incrementar visualizações
        Curso.incrementarVisualizacoes(id, (err) => {
            if (err) console.error('Erro ao incrementar visualizações:', err.message);
        });
        
        res.json(curso);
    });
});

// Deletar curso
router.delete('/:id', (req, res) => {
    Curso.deletar(req.params.id, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Curso não encontrado' });
        res.status(204).send();
    });
});

// Atualizar curso (incluindo imagem)
router.put('/:id', (req, res) => {
    const { titulo, descricao, professor_id, categoria_id, imagem } = req.body;
    const { id } = req.params;

    Curso.atualizar(id, titulo, descricao, professor_id, categoria_id, imagem, (err, changes) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (changes === 0) return res.status(404).json({ erro: 'Curso não encontrado' });
        res.status(200).json({ message: 'Curso atualizado com sucesso' });
    });
});

module.exports = router;