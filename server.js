const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/consulta', async (req, res) => {
    const { tipoConsulta, apiKey, parametros } = req.body;
    let url = `https://api.conciliadora.com.br/api/${tipoConsulta}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey
            },
            body: JSON.stringify(parametros)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro na consulta' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
