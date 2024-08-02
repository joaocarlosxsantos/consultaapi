import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/consulta', async (req, res) => {
    const { tipoConsulta, apiKey, parametros } = req.body;
    const url = `https://api.conciliadora.com.br/api/${tipoConsulta}?$filter=${parametros}`;

    console.log(`URL: ${url}, API Key: ${apiKey}`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
                'Accept': 'application/json'
            }
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
