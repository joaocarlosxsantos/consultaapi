import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const fetchWithTimeout = (url, options, timeout = 5000000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
};

app.post('/consulta', async (req, res) => {
    const { tipoConsulta, apiKey, parametros } = req.body;
    const url = `https://api.conciliadora.com.br/api/${tipoConsulta}?$filter=${encodeURIComponent(parametros)}`;

    console.log(`URL: ${url}, API Key: ${apiKey}`);

    try {
        const response = await fetchWithTimeout(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
                'Accept': 'application/json'
            }
        }, 5000); // Timeout configurado para 5 segundos

        const text = await response.text();
        console.log('Resposta bruta:', text);

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
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
