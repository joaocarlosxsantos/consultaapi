document.getElementById('consultaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipoConsulta = document.getElementById('tipoConsulta').value;
    const apiKey = document.getElementById('apiKey').value;
    const data_inicio = document.getElementById('data_inicio').value;
    const data_fim = document.getElementById('data_fim').value;
    const estabelecimento = document.getElementById('estabelecimento').value;
    const nsu = document.getElementById('nsu').value;
    const parametros = `Data${tipoConsulta} ge ${data_inicio} and Data${tipoConsulta} le ${data_fim}`;

    if(estabelecimento !==  null){parametros += `and Estabelecimento eq ${Estabelecimento}`};
    if(nsu !==  null){parametros += `and Nsu eq ${nsu}`};
    
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

        const text = await response.text();
        console.log('Resposta bruta:', text);

        let result;
        try {
            result = JSON.parse(text);
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
