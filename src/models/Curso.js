const db = require('../database/db');

class Curso {
    // Criar curso com imagem e visualizações
    static criar(titulo, descricao, professor_id, categoria_id, imagem,visualizacoes, callback) {
        const query = 'INSERT INTO cursos (titulo, descricao, professor_id, categoria_id, imagem, visualizacoes) VALUES (?, ?, ?, ?, ?, ?)';
        db.run(query, [titulo, descricao, professor_id, categoria_id, imagem, visualizacoes], function (err) {
            callback(err, this?.lastID);
        });
    }

    // Buscar todos os cursos
    static buscarTodos(callback) {
        db.all('SELECT * FROM cursos', [], (err, rows) => {
            callback(err, rows);
        });
    }

    // Buscar curso por ID
    static buscarPorId(id, callback) {
        db.get('SELECT * FROM cursos WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    }

    // Atualizar curso (incluindo imagem)
    static atualizar(id, titulo, descricao, professor_id, categoria_id, imagem, callback) {
        const query = 'UPDATE cursos SET titulo = ?, descricao = ?, professor_id = ?, categoria_id = ?, imagem = ? WHERE id = ?';
        db.run(query, [titulo, descricao, professor_id, categoria_id, imagem, id], function (err) {
            callback(err, this.changes);
        });
    }

    // Deletar curso
    static deletar(id, callback) {
        db.run('DELETE FROM cursos WHERE id = ?', [id], function (err) {
            callback(err, this.changes);
        });
    }

    // Incrementar número de visualizações
    static incrementarVisualizacoes(id, callback) {
        const query = 'UPDATE cursos SET visualizacoes = visualizacoes + 1 WHERE id = ?';
        db.run(query, [id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = Curso;
