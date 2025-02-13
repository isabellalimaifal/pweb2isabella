const express = require('express');
const path = require('path');
const app = express();

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Configurar a pasta 'static' como estática
app.use(express.static(path.join(__dirname, 'static')));

// Rota para a página inicial (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Rota para o formulário (formulario.html)
app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'formulario.html'));
});

// Rota para processar o formulário
app.post('/carro', (req, res) => {
    const { modelo, marca, ano, cor, km, valor } = req.body;

    // Exibir os dados no console do servidor
    console.log("Modelo do carro: " + modelo);
    console.log("Marca do carro: " + marca);
    console.log("Ano do carro: " + ano);
    console.log("Cor do carro: " + cor);
    console.log("Kilometragem: " + km);
    console.log("Valor: " + valor);

    // Resposta simples com os dados do carro
    res.send(`
        <h1>Carro cadastrado com sucesso!</h1>
        <h2>Dados do carro:</h2>
        <p><strong>Modelo:</strong> ${modelo}</p>
        <p><strong>Marca:</strong> ${marca}</p>
        <p><strong>Ano:</strong> ${ano}</p>
        <p><strong>Cor:</strong> ${cor}</p>
        <p><strong>Kilometragem:</strong> ${km} km</p>
        <p><strong>Valor:</strong> R$ ${valor}</p>
        <a href="/formulario">Voltar para o formulário</a>
    `);
});

app.listen(3005, () => {
    console.log('Servidor rodando na porta http://localhost:3005');
});
