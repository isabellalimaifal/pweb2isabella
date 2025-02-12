const express = require('express');
const path = require('path');
const app = express();

// Configurar a pasta 'static' como pública
app.use(express.static(path.join(__dirname, 'static')));

// Rota para a página inicial (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Rota para a biografia
app.get('/biografia', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'biografia.html'));
});

// Rota para o formulário
app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'formulario.html'));
});

// Iniciar o servidor na porta 3003
app.listen(3003, () => {
    console.log('Servidor rodando na porta http://localhost:3003');
});
