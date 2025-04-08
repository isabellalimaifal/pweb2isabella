// 1. Inicialize seu projeto Node (fora do código):
// npm init -y
// npm install express ejs sqlite3 body-parser
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.get('/cadastro', (req, res) => res.render('cadastro'));
app.post('/cadastro', (req, res) => {
  const { nome, cpf, email, senha, data_nasc } = req.body;
  db.run(`INSERT INTO clientes (nome, cpf, email, senha, data_nasc) VALUES (?, ?, ?, ?, ?)`,
    [nome, cpf, email, senha, data_nasc], err => {
      if (err) return res.send('Erro ao cadastrar.');
      res.redirect('/login');
    });
});

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get(`SELECT * FROM clientes WHERE email = ? AND senha = ?`, [email, senha], (err, cliente) => {
    if (err || !cliente) return res.send('Login inválido.');
    res.redirect(`/dashboard/${cliente.id}`);
  });
});

app.get('/dashboard/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM clientes WHERE id = ?`, [id], (err, cliente) => {
    if (err || !cliente) return res.send('Cliente não encontrado.');
    db.all(`SELECT * FROM pets WHERE cliente_id = ?`, [id], (err, pets) => {
      if (err) return res.send('Erro ao buscar pets.');
      res.render('dashboard', { cliente, pets });
    });
  });
});

app.post('/pet/add', (req, res) => {
  const { nome, especie, raca, data_nasc, observacoes, cliente_id } = req.body;
  db.run(`INSERT INTO pets (nome, especie, raca, data_nasc, observacoes, cliente_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, especie, raca, data_nasc, observacoes, cliente_id], err => {
      if (err) return res.send('Erro ao cadastrar pet.');
      res.redirect(`/dashboard/${cliente_id}`);
    });
});

app.post('/pet/delete/:id', (req, res) => {
  const petId = req.params.id;
  const clienteId = req.body.cliente_id;
  db.run(`DELETE FROM pets WHERE id = ?`, [petId], err => {
    if (err) return res.send('Erro ao excluir pet.');
    res.redirect(`/dashboard/${clienteId}`);
  });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
