const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  funcao: {
    type: String,
    required: true,
  },
  cursos: {
    type: Array,
  },
  senha: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
