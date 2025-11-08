// script.js
// ===========================
// Exemplo de interação simples com o DOM
// ===========================

// Mensagem no console
console.log("Gulp está funcionando! 🎯");

// Seleciona todos os botões
const buttons = document.querySelectorAll(".button");

// Adiciona um evento de clique em cada botão
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    alert(`Você clicou em: ${button.textContent}`);
  });
});

// Função simples só para mostrar lógica JS
function mudarTitulo(novoTitulo) {
  const titulo = document.querySelector("header h1");
  if (titulo) {
    titulo.textContent = novoTitulo;
  }
}

// Exemplo de chamada (depois de 2 segundos)
setTimeout(() => {
  mudarTitulo("Automação com Gulp e Sass 🚀");
}, 2000);