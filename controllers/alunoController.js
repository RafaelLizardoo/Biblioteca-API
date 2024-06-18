const db = require('../config/database');

// Função para obter todos os alunos
const getAllAlunos = (req, res) => {
  db.all('SELECT * FROM FichaAluno', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// Função para obter um aluno por CPF
const getAlunoByCPF = (req, res) => {
  const cpf = req.params.cpf;
  db.get('SELECT * FROM FichaAluno WHERE CPFAluno = ?', [cpf], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.json(row);
    }
  });
};

// Função para criar ficha de aluno
const createAluno = (req, res) => {
  const { nome, email, telefone, matricula, cpf, codigoLivro } = req.body;
  db.run('INSERT INTO FichaAluno (NomeAluno, Email, Telefone, Matricula, CPFAluno, CodigoLivro) VALUES (?, ?, ?, ?, ?, ?)', [nome, email, telefone, matricula, cpf, codigoLivro], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao criar ficha de aluno');
    } else {
      res.status(201).send('Ficha de aluno criada com sucesso');
    }
  });
};

module.exports = { getAllAlunos, getAlunoByCPF, createAluno };
