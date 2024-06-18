const express = require('express');
const { getAllAlunos, getAlunoByCPF, createAluno } = require('../controllers/alunoController');

const router = express.Router();

router.get('/', getAllAlunos);
router.get('/:cpf', getAlunoByCPF);
router.post('/', createAluno);

module.exports = router;
