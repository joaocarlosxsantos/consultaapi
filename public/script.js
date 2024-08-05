document.getElementById('consultaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipoConsulta = document.getElementById('tipoConsulta').value;
    const apiKey = document.getElementById('apiKey').value;
    const data_inicio = document.getElementById('data_inicio').value;
    const data_fim = document.getElementById('data_fim').value;
    const estabelecimento = document.getElementById('estabelecimento').value;
    const nsu = document.getElementById('nsu').value;

    try {
        //let data_inicio_formatada = `${data_inicio.getFullYear()}-${(data_inicio.getMonth() + 1).toString().padStart(2, '0')}-${data_inicio.getDate().toString().padStart(2, '0')}`;
        //let data_fim_formatada = `${data_fim.getFullYear()}-${(data_fim.getMonth() + 1).toString().padStart(2, '0')}-${data_fim.getDate().toString().padStart(2, '0')}`;
        let parametros = ('Data',tipoConsulta,'ge',data_inicio,'and Data',tipoConsulta,'le',data_fim)

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
