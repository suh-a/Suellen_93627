// Adiciona um ouvinte de evento para o envio do formulário
document.getElementById("calculadora-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário (recarregar a página)

    // Obtém o valor do primeiro número e converte para float
    var num1 = parseFloat(document.getElementById("num1").value);
    // Obtém o valor do segundo número e converte para float
    var num2 = parseFloat(document.getElementById("num2").value);
    

    // Verifica se ambos os valores são números válidos
    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, insira números válidos em ambos os campos."); // Exibe alerta se algum campo não for número
        return; // Interrompe a execução
    }


    // Realiza a soma dos dois números
    var resultado = num1 + num2;
    // Exibe o resultado no elemento com id 'result'
    document.getElementById("result").textContent = resultado;
});
