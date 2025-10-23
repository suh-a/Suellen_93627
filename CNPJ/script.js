document.getElementById("cnpj-form").addEventListener("submit", function(event) {   
    event.preventDefault(); // Impede o envio do formulário

    var cnpjInput = document.getElementById("cnpj");
    var cnpj = cnpjInput.value.replace(/\D/g, ''); // remove tudo que não for dígito

    // validação básica do CNPJ (14 dígitos)
    if (!/^[0-9]{14}$/.test(cnpj)) {
        alert('Por favor, insira um CNPJ válido com 14 dígitos.');
        cnpjInput.focus();
        return;
    }

    // elementos de resultado (apenas os 4 solicitados)
    var nomeEl = document.getElementById('nome');
    var fantasiaEl = document.getElementById('nome_fantasia');
    var cidadeEl = document.getElementById('cidade');
    var estadoEl = document.getElementById('estado');

    // feedback de carregamento
    nomeEl.textContent = 'Carregando...';
    fantasiaEl.textContent = '';
    cidadeEl.textContent = '';
    estadoEl.textContent = '';

    // API pública informada: BrasilAPI (endpoint esperado: https://brasilapi.com.br/api/cnpj/v1/{cnpj})
    var url = 'https://brasilapi.com.br/api/cnpj/v1/' + cnpj;

    fetch(url)
        .then(function(response) {
            if (!response.ok) throw new Error('Resposta da rede não OK');
            return response.json();
        })
        .then(function(data) {
            // para depuração: ver o JSON retornado no console
            console.log('CNPJ API response:', data);
            // Algumas APIs retornam erro no campo 'message' ou em 'status'
            if (data.message || data.status === 'ERROR') {
                console.error('API retornou erro:', data);
                nomeEl.textContent = '';
                alert('Erro na consulta: ' + (data.message || 'não foi possível consultar.'));
                return;
            }

            // Preencher apenas os campos solicitados diretamente do JSON fornecido
            var nomeSocial = data.razao_social || data.nome || '';
            // priorizar nome_fantasia; se não houver, tentar razao_social, fantasia ou nome
            var nomeFantasia = data.nome_fantasia || data.razao_social || data.fantasia || data.nome || '';
            var cidade = data.municipio || data.municipio_nome || '';
            var estado = data.uf || data.estado || '';

            // logs específicos para depuração de fantasia
            console.log('fields check -> nome_fantasia:', data.nome_fantasia, 'fantasia:', data.fantasia, 'nome:', data.nome, 'razao_social:', data.razao_social);

            // helper: limpar possíveis prefixos/sufixos numéricos e caracteres mascarados
            function cleanDisplayName(s) {
                if (!s) return '';
                s = String(s).trim();
                // remove prefixos compostos por caracteres não alfabéticos (inclui números, pontuação, espaços)
                // preserva letra inicial (inclui acentos)
                s = s.replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ]+/, '');
                // remove sufixos numéricos mascarados (ex: - ***000000** ou - 123.456.789-00)
                s = s.replace(/\s*[-–—|]\s*\*{0,}\d+[\d\.\-\*]*\*{0,}$/g, '');
                return s.trim();
            }

            // limpeza mais leve para nome fantasia: não remove prefixos (pode ter números legítimos)
            function cleanFantasia(s) {
                if (!s) return '';
                s = String(s).trim();
                // apenas remove sufixos numericos mascarados
                // remover prefixos não alfabéticos (caso gratuito) e sufixos mascarados
                s = s.replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ]+/, '');
                s = s.replace(/\s*[-–—|]\s*\*{0,}\d+[\d\.\-\*]*\*{0,}$/g, '');
                return s.trim();
            }

            nomeSocial = cleanDisplayName(nomeSocial);
            // fallback: se não houver nome fantasia, use a razão social (ou fantasia alternativa)
            nomeFantasia = nomeFantasia || data.razao_social || '';
            nomeFantasia = cleanFantasia(nomeFantasia);
            if (!nomeFantasia) nomeFantasia = 'Não informado';

            nomeEl.textContent = nomeSocial;
            fantasiaEl.textContent = nomeFantasia;
            cidadeEl.textContent = cidade;
            estadoEl.textContent = estado;
        })
        .catch(function(error) {
            console.error('Erro ao consultar CNPJ:', error);
            nomeEl.textContent = '';
            alert('Ocorreu um erro ao consultar o CNPJ. Tente novamente mais tarde.');
        });

});

// limpar resultados quando o usuário apagar o CNPJ
document.getElementById('cnpj').addEventListener('input', function(event) {
    var value = (event.target.value || '').replace(/\D/g, '');
    if (value.length === 0) {
        document.getElementById('nome').textContent = '';
        document.getElementById('nome_fantasia').textContent = '';
        document.getElementById('cidade').textContent = '';
        document.getElementById('estado').textContent = '';
    }
});