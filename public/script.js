document.getElementById('consultaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipoConsulta = document.getElementById('tipoConsulta').value;
    const apiKey = document.getElementById('apiKey').value;
    const parametros = document.getElementById('parametros').value;

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

    const result = await response.json();
    document.getElementById('resultado').textContent = JSON.stringify(result, null, 2);
});
