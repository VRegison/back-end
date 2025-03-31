const db = require('./db');

const createTables = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS cursos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                descricao TEXT,
                imagem TEXT,
                visualizacoes INTEGER DEFAULT 0,
                professor_id INTEGER,
                categoria_id INTEGER, 
                FOREIGN KEY (professor_id) REFERENCES professores(id),
                FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
            )
        `);
        
        db.run(`
            CREATE TABLE IF NOT EXISTS professores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                especialidade TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS categorias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT
            );
        `);
    });
};

createTables();
module.exports = db;