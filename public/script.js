document.getElementById('consultaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const tipoConsulta = document.getElementById('tipoConsulta').value;
    const apiKey = document.getElementById('apiKey').value;
    const parametros = JSON.parse(document.getElementById('parametros').value);

    const response = await fetch('/consulta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipoConsulta, apiKey, parametros })
    });

    const resultado = await response.json();
    document.getElementById('resultado').textContent = JSON.stringify(resultado, null, 2);
});
