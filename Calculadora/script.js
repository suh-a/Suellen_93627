// Selecionando elementos
const display = document.getElementById("display");
const botoes = document.querySelectorAll(".botoes button");

let operacao = ""; // Guarda a expressão atual

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    const valor = botao.textContent;

    // Limpar tudo
    if (valor === "C") {
      operacao = "";
      display.textContent = "";
    } 
    // Apagar último caractere
    else if (valor === "DEL") {
      operacao = operacao.slice(0, -1);
      display.textContent = operacao;
    } 
    // Calcular resultado
    else if (valor === "=") {
      try {
        // Avalia a expressão armazenada
        display.textContent = eval(operacao);
        operacao = display.textContent; // permite continuar calculando
      } catch {
        display.textContent = "Erro";
        operacao = "";
      }
    } 
    // Adicionar números, operadores e ponto
    else {
      operacao += valor;
      display.textContent = operacao;
    }
  });
});
 