const form = document.getElementById('form-deposito');
const nomeBeneficiario = document.getElementById("nome-beneficiario");
let formEValido = false;

function validanome(nomeCompleto) {
    const nomeComoArray = nomeCompleto.split(' ');
    return nomeComoArray.length >= 2 & nomeComoArray[1] != '';
}

form.addEventListener('submit', function(e){

    e.preventDefault();

    const numeroContaBeneficiario = document.getElementById("numero-conta");
    const valorDeposito = document.getElementById("valor-deposito");
    const mensagemSucesso = `Montante de: <b>${valorDeposito.value}€</b> depositado para o Cliente: <b>${nomeBeneficiario.value}</b> / Conta Cliente: <b>${numeroContaBeneficiario.value}</b>`;
    const mensagemtextarea = document.getElementById("text-area");
    formEValido = validanome(nomeBeneficiario.value)
    if (formEValido) {
      const containerMensagemSucesso = document.querySelector(".mensagem-sucesso");
      document.querySelector(".mensagem-sucesso").innerHTML = mensagemSucesso;
      containerMensagemSucesso.style.display = "block";
  

      nomeBeneficiario.value = '';
      numeroContaBeneficiario.value = '';
      valorDeposito.value = '';
      mensagemtextarea.value = '';
    }
    else {
      nomeBeneficiario.style.border = "1px solid red";
      document.querySelector(".requestname").style.display = "block";
      

    }
})

nomeBeneficiario.addEventListener("keyup", function(e){

formEValido = validanome(e.target.value);

if (formEValido) {
  nomeBeneficiario.style.border = "";
  document.querySelector(".requestname").style.display = "none";
} else {
  nomeBeneficiario.style.border = "1px solid red";
  document.querySelector(".requestname").style.display = "block";
}
})

