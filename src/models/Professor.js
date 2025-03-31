// src/models/Professor.js
const db = require('../database/db');

class Professor {
    static criar(nome, especialidade, callback) {
        const query = 'INSERT INTO professores (nome, especialidade) VALUES (?, ?)';
        db.run(query, [nome, especialidade], function (err) {
            callback(err, this?.lastID);
        });
    }

    static buscarTodos(callback) {
        db.all('SELECT * FROM professores', [], (err, rows) => {
            callback(err, rows);
        });
    }

    static buscarPorId(id, callback) {
        db.get('SELECT * FROM professores WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    }

    static deletar(id, callback) {
        db.run('DELETE FROM professores WHERE id = ?', [id], function (err) {
            callback(err, this.changes);
        });
    }

    // Método para atualizar professor
    static atualizar(id, nome, especialidade, callback) {
        const query = 'UPDATE professores SET nome = ?, especialidade = ? WHERE id = ?';
        db.run(query, [nome, especialidade, id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = Professor;
