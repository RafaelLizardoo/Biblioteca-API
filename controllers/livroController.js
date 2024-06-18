const db = require('../config/database');

// Função para cadastrar livro
const createLivro = (req, res) => {
  const { codigoLivro, nome, autor, editora, ano, categoria, imagemLivro, dataReserva, dataDevolucao, status, cpfAluno } = req.body;
  db.run('INSERT INTO Livro (CodigoLivro, NomeLivro, Autor, Editora, Ano, Categoria, ImagemLivro, DataReserva, DataDevolucao, Status, CPFAluno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [codigoLivro, nome, autor, editora, ano, categoria, imagemLivro, dataReserva, dataDevolucao, status, cpfAluno], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao cadastrar livro');
    } else {
      res.status(201).send('Livro cadastrado com sucesso');
    }
  });
};

// Função para atualizar cadastro de livro
const updateLivro = (req, res) => {
  const { nome, autor, editora, ano, categoria, imagemLivro, dataReserva, dataDevolucao, status, cpfAluno } = req.body;
  const { codigo } = req.params;
  db.run('UPDATE Livro SET NomeLivro = ?, Autor = ?, Editora = ?, Ano = ?, Categoria = ?, ImagemLivro = ?, DataReserva = ?, DataDevolucao = ?, Status = ?, CPFAluno = ? WHERE CodigoLivro = ?', [nome, autor, editora, ano, categoria, imagemLivro, dataReserva, dataDevolucao, status, cpfAluno, codigo], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao atualizar cadastro de livro');
    } else {
      res.status(200).send('Cadastro de livro atualizado com sucesso');
    }
  });
};

// Função para apagar cadastro de livro
const deleteLivro = (req, res) => {
  const { codigo } = req.params;
  db.run('DELETE FROM Livro WHERE CodigoLivro = ?', [codigo], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao apagar cadastro de livro');
    } else {
      res.status(200).send('Cadastro de livro apagado com sucesso');
    }
  });
};

// Função para consultar pendências de livros
const getPendencias = (req, res) => {
  db.all('SELECT Livro.NomeLivro, Livro.CodigoLivro, FichaAluno.NomeAluno, FichaAluno.CPFAluno, FichaAluno.Telefone FROM Livro INNER JOIN FichaAluno ON Livro.CPFAluno = FichaAluno.CPFAluno', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao consultar pendências de livros');
    } else {
      res.status(200).json(rows);
    }
  });
};

// Função para registrar a devolução do livro
const devolverLivro = (req, res) => {
  const { codigoLivro } = req.params;

  db.get('SELECT * FROM Livro WHERE CodigoLivro = ?', [codigoLivro], (err, livro) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao verificar reserva do livro');
      return;
    }

    if (livro.Status !== 'Reservado') {
      res.status(400).send('Livro não está reservado');
      return;
    }

    db.run('UPDATE Livro SET Status = ?, CPFAluno = ? WHERE CodigoLivro = ?', ['Disponível', null, codigoLivro], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao devolver livro');
      } else {
        res.status(200).send('Livro devolvido com sucesso');
      }
    });
  });
};

// Função para reservar um livro
const reservarLivro = (req, res) => {
  const { codigoLivro, cpfAluno } = req.params;

  db.get('SELECT * FROM Livro WHERE CodigoLivro = ?', [codigoLivro], (err, livro) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao verificar reserva do livro');
      return;
    }

    if (livro.Status === 'Reservado') {
      res.status(400).send('Livro já está reservado');
      return;
    }

    db.run('UPDATE Livro SET Status = ?, CPFAluno = ? WHERE CodigoLivro = ?', ['Reservado', cpfAluno, codigoLivro], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao reservar livro');
      } else {
        res.status(200).send('Livro reservado com sucesso');
      }
    });
  });
};

const getLivros = (req,res) => {
 // Função retornar livros
    db.all('SELECT * FROM Livro', (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao pesquisar livro');
      } else if (!row) {
        res.status(404).send('Livro não encontrado');
      } else {
        res.status(200).json(row);
      }
    });
}

module.exports = { createLivro, updateLivro, deleteLivro, getPendencias, devolverLivro, reservarLivro, getLivros };
