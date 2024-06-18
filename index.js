const express = require('express');
const alunoRoutes = require('./routes/alunoRoutes');
const bibliotecarioRoutes = require('./routes/bibliotecarioRoutes');
const livroRoutes = require('./routes/livroRoutes');
require('./models/databaseInitialization');  // Inicializa o banco de dados

const app = express();
const port = 3003;

app.use(express.json());

// Define os prefixos corretamente para cada conjunto de rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/bibliotecarios', bibliotecarioRoutes);
app.use('/api/livros', livroRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
