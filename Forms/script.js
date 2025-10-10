// Função principal de validação do formulário de cadastro
function validarFormulario() {
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value; // Valor do campo nome
    const email = document.getElementById("email").value; // Valor do campo email
    const telefone = document.getElementById("telefone").value; // Valor do campo telefone
    const senha = document.getElementById("senha").value; // Valor do campo senha
    const confirmarSenha = document.getElementById("confirmarSenha").value; // Valor do campo confirmação de senha

    // Função auxiliar para exibir mensagem de erro na tela
    function mostrarErro(msg) {
        const erroDiv = document.getElementById('mensagem-erro');
        erroDiv.innerText = msg;
        erroDiv.style.display = 'block';
    }

    // Função auxiliar para exibir mensagem de sucesso na tela
    function mostrarSucesso(msg) {
        const sucessoDiv = document.getElementById('mensagem-sucesso');
        sucessoDiv.innerText = msg;
        sucessoDiv.style.display = 'block';
    }

    // Função auxiliar para limpar a mensagem de erro
    function limparErro() {
        const erroDiv = document.getElementById('mensagem-erro');
        erroDiv.innerText = '';
        erroDiv.style.display = 'none';
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (nome === "" || email === "" || telefone === "" || senha === "" || confirmarSenha === "") {
        mostrarErro("Por favor, preencha todos os campos.");
        return false;
    }

    // Validação simples do formato do email usando regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        mostrarErro("Por favor, insira um email válido.");
        return false;
    }

    // Validação da senha: mínimo 8 caracteres, pelo menos 1 letra, 1 número e 1 caractere especial
    const senhaPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!senhaPattern.test(senha)) {
        mostrarErro("A senha deve ter pelo menos 8 caracteres, incluindo uma letra, um número e um caractere especial.");
        document.getElementById('senha').focus();
        return false;
    }

    // Verifica se a confirmação de senha é igual à senha
    if (senha !== confirmarSenha) {
        mostrarErro("As senhas não coincidem. Por favor, confirme a senha corretamente.");
        document.getElementById('confirmarSenha').focus();
        return false;
    }

    // Se todas as validações passarem, limpa a mensagem de erro e exibe sucesso
    limparErro();
    mostrarSucesso("Formulário enviado com sucesso!");
    return true;
}
