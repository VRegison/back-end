
const mongoose = require('mongoose');

// Função para conectar ao MongoDB
const conectarAoBancoDeDados = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:xhG38osxfOqg6uY4@cluster01.o6h95.mongodb.net/projeto-faculdade', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra o processo se não conseguir conectar
  }
};

module.exports = conectarAoBancoDeDados;
