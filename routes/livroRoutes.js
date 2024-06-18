const express = require('express');
const { createLivro, updateLivro, deleteLivro, getPendencias, devolverLivro, reservarLivro, getLivros } = require('../controllers/livroController');

const router = express.Router();

router.post('/', createLivro);  // Rota para criar um livro
router.put('/atualizar/:codigo', updateLivro);  // Rota para atualizar um livro
router.delete('/delete/:codigo', deleteLivro);  // Rota para deletar um livro
router.get('/pendencias', getPendencias);  // Rota para obter pendências de livros
router.post('/devolver/:codigoLivro', devolverLivro);  // Rota para devolver um livro
router.post('/reservar/:codigoLivro/:cpfAluno', reservarLivro);  // Rota para reservar um livro
router.get('/', getLivros);  // Rota para retornar todos os livros

module.exports = router;
