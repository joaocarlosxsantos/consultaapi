import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/consulta', async (req, res) => {
    const { tipoConsulta, apiKey, parametros } = req.body;

    // Formata a URL com o prefixo $filter
    const url = `https://api.conciliadora.com.br/api/${tipoConsulta}?$filter=${encodeURIComponent(parametros)}`;

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

        const text = await response.text();
        console.log('Resposta bruta:', text); // Log da resposta bruta

        // Verifica se a resposta é um JSON válido
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Erro ao analisar JSON:', e);
            return res.status(500).json({ error: 'Resposta não é um JSON válido' });
        }

        res.json(data);
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ error: 'Erro na consulta' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
