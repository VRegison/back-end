// src/models/Categoria.js
const db = require('../database/db');

class Categoria {
    // Criar categoria
    static criar(nome, descricao, callback) {
        const query = 'INSERT INTO categorias (nome, descricao) VALUES (?, ?)';
        db.run(query, [nome, descricao], function (err) {
            callback(err, this?.lastID);
        });
    }

    // Buscar todas as categorias
    static buscarTodos(callback) {
        db.all('SELECT * FROM categorias', [], (err, rows) => {
            callback(err, rows);
        });
    }

    // Buscar categoria por ID
    static buscarPorId(id, callback) {
        db.get('SELECT * FROM categorias WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    }

    // Deletar categoria
    static deletar(id, callback) {
        db.run('DELETE FROM categorias WHERE id = ?', [id], function (err) {
            callback(err, this.changes);
        });
    }

    // Atualizar categoria
    static atualizar(id, nome, descricao, callback) {
        const query = 'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?';
        db.run(query, [nome, descricao, id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = Categoria;
