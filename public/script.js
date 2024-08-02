document.getElementById('consultaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipoConsulta = document.getElementById('tipoConsulta').value;
    const apiKey = document.getElementById('apiKey').value;
    const parametros = document.getElementById('parametros').value;

    try {
        const response = await fetch('/consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipoConsulta,
                apiKey,
                parametros
            })
        });

        const text = await response.text(); // Obtenha a resposta como texto
        console.log('Resposta bruta:', text); // Mostre a resposta no console

        let result;
        try {
            result = JSON.parse(text); // Tente converter o texto em JSON
        } catch (e) {
            console.error('Erro ao analisar JSON:', e);
            result = { error: 'Resposta não é um JSON válido' };
        }

        document.getElementById('resultado').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Erro na consulta:', error);
        document.getElementById('resultado').textContent = 'Erro na consulta';
    }
});
