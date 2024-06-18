const db = require('../config/database');

// Criação das tabelas e inserção de dados iniciais
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Bibliotecario (
            NomeBibliotecario TEXT,
            CPFBibliotecario TEXT PRIMARY KEY,
            Email TEXT,
            Usuario TEXT,
            Senha TEXT
        )`);
  db.run(`CREATE TABLE IF NOT EXISTS Livro (
            CodigoLivro INTEGER PRIMARY KEY,
            NomeLivro TEXT,
            Autor TEXT,
            Editora TEXT,
            Ano INTEGER,
            Categoria TEXT,
            ImagemLivro TEXT,
            DataReserva TEXT,
            DataDevolucao TEXT,
            Status TEXT,
            CPFAluno TEXT REFERENCES FichaAluno(CPFAluno)
        )`);
  db.run(`CREATE TABLE IF NOT EXISTS FichaAluno (
            NomeAluno TEXT,
            Email TEXT,
            Telefone TEXT,
            Matricula TEXT,
            CPFAluno TEXT PRIMARY KEY,
            CodigoLivro INTEGER REFERENCES Livro(CodigoLivro)
        )`, () => {
    db.get('SELECT COUNT(*) AS count FROM Bibliotecario', (err, row) => {
      if (err) {
        console.error(err.message);
      } else if (row.count === 0) {
        db.run(`INSERT INTO Bibliotecario (NomeBibliotecario, CPFBibliotecario, Email, Usuario, Senha) VALUES 
                ('João Silva', '12345678900', 'joao.silva@example.com', 'joaosilva', 'senha123')`);
      }
    });

    db.get('SELECT COUNT(*) AS count FROM FichaAluno', (err, row) => {
      if (err) {
        console.error(err.message);
      } else if (row.count === 0) {
        const alunos = [
          ['Ana Souza', 'ana.souza@example.com', '11987654321', '2023001', '85676915080', null],
          ['Bruno Lima', 'bruno.lima@example.com', '11987654322', '2023002', '80012017086', null],
          ['Carlos Pereira', 'carlos.pereira@example.com', '11987654323', '2023003', '98550420000', null],
          ['Daniela Alves', 'daniela.alves@example.com', '11987654324', '2023004', '30373869088', null],
          ['Eduardo Santos', 'eduardo.santos@example.com', '11987654325', '2023005', '75958591070', null]
        ];

        alunos.forEach(aluno => {
          db.run(`INSERT INTO FichaAluno (NomeAluno, Email, Telefone, Matricula, CPFAluno, CodigoLivro) VALUES (?, ?, ?, ?, ?, ?)`, aluno);
        });
      }
    });

    db.get('SELECT COUNT(*) AS count FROM Livro', (err, row) => {
      if (err) {
        console.error(err.message);
      } else if (row.count === 0) {
        const livros = [
          [1, 'Livro A', 'Autor A', 'Editora A', 2020, 'Ficção', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbk2f_PypRaOZ43EsJ5XpHRgASG7TpKhpWuQ&s', null, null, 'Disponível', null],
          [2, 'Livro B', 'Autor B', 'Editora B', 2019, 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi9rVL2GzfRxr3QXWc4vw4JVbUgkoNKcal4Q&s', null, null, 'Disponível', null],
          [3, 'Livro C', 'Autor C', 'Editora C', 2021, 'Romance', 'https://static.stealthelook.com.br/wp-content/uploads/2024/03/livros-de-romance-como-eu-era-antes-de-voce-20240326165339.jpg', null, null, 'Disponível', null],
          [4, 'Livro D', 'Autor D', 'Editora D', 2018, 'Aventura', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTh98sHGA0SsEg57ukixOLO2lOpRMyzT1hyQ&s', null, null, 'Disponível', null],
          [5, 'Livro E', 'Autor E', 'Editora E', 2017, 'Terror', 'https://www.flipar.com.br/wp-content/uploads/2023/07/07-A-assombracao-da-Casa-da-Colina-Livro-Livros-de-Terror-Reproducao-site-Amazon.jpg', null, null, 'Disponível', null],
          [6, 'Livro F', 'Autor F', 'Editora F', 2016, 'Ficção Científica', 'https://www.edipro.com.br/wp-content/uploads/2020/07/a-maquina-do-tempo-330x462.jpg', null, null, 'Disponível', null],
          [7, 'Livro G', 'Autor G', 'Editora G', 2015, 'Biografia', 'https://cdn.awsli.com.br/2500x2500/1576/1576093/produto/201093606/silvio-santos-a-biografia-definitivabaixa-f2edf7ca1b.jpg', null, null, 'Disponível', null],
          [8, 'Livro H', 'Autor H', 'Editora H', 2014, 'História', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnslvsv5EtNQo1dZgmAUa-Bfh0K2KZDviJFw&s', null, null, 'Disponível', null],
          [9, 'Livro I', 'Autor I', 'Editora I', 2013, 'Ficção', 'https://lh5.googleusercontent.com/z3m2-SjQoPRR1nFg97OwzBuE16O8XoUJv3gzsuJsmStMs6vzX0hrSyPcr_-Sg-Qcob4oIM9Ghur_rZQaSYMNXYaeNksTwgNiTeSo-9-2z3WuUVPr_gCAcRSTC45knwJjA7h_BzB0DpjVkZAieiSpmEI', null, null, 'Disponível', null],
          [10, 'Livro J', 'Autor J', 'Editora J', 2012, 'Aventura', 'https://img.br.my-best.com/product_images/d1e8829f5ac065f2d80236233f63813a.jpg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=505c96ae9329290358776727b2842c97', null, null, 'Disponível', null]
        ];

        livros.forEach(livro => {
          db.run(`INSERT INTO Livro (CodigoLivro, NomeLivro, Autor, Editora, Ano, Categoria, ImagemLivro, DataReserva, DataDevolucao, Status, CPFAluno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, livro);
        });
      }
    });
    console.log('Dados iniciais inseridos.');
  });
});
