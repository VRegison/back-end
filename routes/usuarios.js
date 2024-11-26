const express = require('express');
const router = express.Router();
const Usuario = require('../model/usuario'); 


// Listar Todos
router.get('/lista', async (req, res) => {
   try {
     const usuarios = await Usuario.find();
     res.status(200).json(usuarios);
   } catch (error) {
     console.error(error);
     res.status(500).json({ mensagem: 'Erro ao buscar usuários', erro: error.message });
   }
 });


router.post('/salva', async (req, res) => {
  const { nome, email,funcao,cursos, senha } = req.body;

  try {
    const novoUsuario = new Usuario({ nome, email,funcao,cursos, senha });

    // Salva o Usuario No Banco De Dados
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
      
    // Validações
    if (error.code === 11000) {
      res.status(400).json({ mensagem: 'Email já está em uso' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao criar usuário', erro: error.message });
    }
  }
});


router.put('/edita/:id', async (req, res) => {
   const { id } = req.params;
   const { nome, email, senha } = req.body;
 
   try {
     const usuarioAtualizado = await Usuario.findByIdAndUpdate(
       id,
       { nome, email, senha },
       { new: true, runValidators: true } 
     );
 
     if (!usuarioAtualizado) {
       return res.status(404).json({ mensagem: 'Usuário não encontrado' });
     }
     res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
   } catch (error) {
     console.error(error);
     res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: error.message });
   }
 });


router.delete('/apaga/:id', async (req, res) => {
   const { id } = req.params;
 
   try {
     const usuario = await Usuario.findByIdAndDelete(id);
     if (!usuario) {
       return res.status(404).json({ mensagem: 'Usuário não encontrado' });
     }
     res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
   } catch (error) {
     console.error(error);
     res.status(500).json({ mensagem: 'Erro ao deletar usuário', erro: error.message });
   }
 });

router.post('/login', async (req, res) => {
   const { email, senha } = req.body;
 
   try {

     const usuario = await Usuario.findOne({ email });
     if (!usuario) {
       return res.status(404).json({ mensagem: 'Usuário não encontrado' });
     }
 
     if(senha == usuario.senha) usuarioSenha = true;
     if (!usuarioSenha) {
       return res.status(401).json({ mensagem: 'Senha incorreta' });
     }
 
     res.status(200).json({ mensagem: 'Login bem-sucedido', usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email, funcao:usuario.funcao } });
   } catch (error) {
     console.error(error);
     res.status(500).json({ mensagem: 'Erro no login', erro: error.message });
   }
});

module.exports = router;
