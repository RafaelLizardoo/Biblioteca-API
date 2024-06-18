const db = require('../config/database');

// Função para obter todos os bibliotecários
const getAllBibliotecarios = (req, res) => {
  db.all('SELECT * FROM Bibliotecario', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// Função para obter um bibliotecário por CPF
const getBibliotecarioByCPF = (req, res) => {
  const cpf = req.params.cpf;
  db.get('SELECT * FROM Bibliotecario WHERE CPFBibliotecario = ?', [cpf], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Bibliotecário não encontrado' });
    } else {
      res.json(row);
    }
  });
};

module.exports = { getAllBibliotecarios, getBibliotecarioByCPF };
