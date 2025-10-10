document.getElementById("calculadora-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtém os valores dos campos de entrada
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);
    

    // Validação simples para garantir que os valores são números
    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, insira números válidos em ambos os campos.");
        return;
    }


    // Realiza a soma
    var resultado = num1 + num2;
    document.getElementById("result").textContent = resultado;
});
