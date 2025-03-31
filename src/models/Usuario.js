// src/models/Usuario.js
const bcrypt = require('bcryptjs');
const db = require('../database/db');

class Usuario {
  static criar(nome, email, senha, callback) {
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) return callback(err);
      
      const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      db.run(query, [nome, email, hashedPassword], function (err) {
        callback(err, this?.lastID);
      });
    });
  }

  static buscarPorEmail(email, callback) {
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
      callback(err, row);
    });
  }

  static buscarTodos(callback) {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
      callback(err, rows);
    });
  }

  static atualizar(id, nome, email, senha, callback) {
    // Se a senha for fornecida, fazemos a criptografia
    const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) return callback(err);
      
      db.run(query, [nome, email, hashedPassword, id], function (err) {
        callback(err, this.changes);
      });
    });
  }
  static buscarPorId(id, callback) {
    db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
      callback(err, row);
    });
  }

  static deletar(id, callback) {
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
      callback(err, this.changes);
    });
  }
}

module.exports = Usuario;
