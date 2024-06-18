const express = require('express');
const { getAllBibliotecarios, getBibliotecarioByCPF } = require('../controllers/bibliotecarioController');

const router = express.Router();

router.get('/', getAllBibliotecarios);  // Rota para obter todos os bibliotecários
router.get('/:cpf', getBibliotecarioByCPF);  // Rota para obter um bibliotecário por CPF

module.exports = router;
