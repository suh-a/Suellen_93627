// Valida se os campos estão preenchidos
function validarLogin() {
  const usuario = document.getElementById("usuario").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (nome === "" || email === "" || senha === "") {
    alert("Por favor, preencha todos os campos!");
    return false;
  }
  return true;
}

// Valida se os campos estão preenchidos
function validarFormulario() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;

  if (nome === "" || preco === "" || quantidade === "") {
    alert("Por favor, preencha todos os campos!");
    return false;
  }
  return true;
}