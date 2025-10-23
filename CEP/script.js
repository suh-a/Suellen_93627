document.getElementById("cep-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    var cepInput = document.getElementById("cep");
    var cep = cepInput.value.replace(/\D/g, ''); // remove tudo que não for dígito

    // validação básica do CEP (8 dígitos)
    if (!/^[0-9]{8}$/.test(cep)) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        cepInput.focus();
        return;
    }

    // Mostra feedback de carregamento
    var ruaEl = document.getElementById("rua");
    var bairroEl = document.getElementById("bairro");
    var cidadeEl = document.getElementById("cidade");
    var estadoEl = document.getElementById("estado");

    ruaEl.textContent = 'Carregando...';
    bairroEl.textContent = '';
    cidadeEl.textContent = '';
    estadoEl.textContent = '';

    // Usamos a API pública ViaCEP para obter os dados
    var url = 'https://viacep.com.br/ws/' + cep + '/json/';

    fetch(url)
        .then(function(response) {
            if (!response.ok) throw new Error('Resposta da rede não OK');
            return response.json();
        })
        .then(function(data) {
            if (data.erro) {
                ruaEl.textContent = '';
                alert('CEP não encontrado.');
                return;
            }

            // Atualiza os campos com os dados retornados
            ruaEl.textContent = data.logradouro || '';
            bairroEl.textContent = data.bairro || '';
            cidadeEl.textContent = data.localidade || '';
            estadoEl.textContent = data.uf || '';
        })
        .catch(function(error) {
            console.error('Erro ao consultar CEP:', error);
            ruaEl.textContent = '';
            alert('Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.');
        });
});

// Quando o usuário apaga o CEP, limpamos os campos de resultado
document.getElementById('cep').addEventListener('input', function(event) {
    var value = (event.target.value || '').replace(/\D/g, '');
    if (value.length === 0) {
        document.getElementById("rua").textContent = '';
        document.getElementById("bairro").textContent = '';
        document.getElementById("cidade").textContent = '';
        document.getElementById("estado").textContent = '';
    }
    // opcional: limpar também se menos que 8 dígitos (evita mostrar dados antigos enquanto digita)
    else if (value.length < 8) {
        document.getElementById("rua").textContent = '';
        document.getElementById("bairro").textContent = '';
        document.getElementById("cidade").textContent = '';
        document.getElementById("estado").textContent = '';
    }
});
