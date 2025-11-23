document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-sorteador');
  const input = document.getElementById('numeroMaximo');
  let resultado = document.getElementById('resultado');

  // Mensagens no console para ajudar a debugar
  console.log('DOM carregado. form:', !!form, 'input:', !!input, 'resultado:', !!resultado);

  if (!form) {
    console.error('Elemento #form-sorteador não encontrado.');
    return;
  }
  if (!input) {
    console.error('Elemento #numeroMaximo não encontrado.');
    return;
  }

  // Se #resultado não existir, cria logo abaixo do formulário
  if (!resultado) {
    resultado = document.createElement('p');
    resultado.id = 'resultado';
    resultado.textContent = ''; // inicial vazio
    form.insertAdjacentElement('afterend', resultado);
    console.info('#resultado criado dinamicamente.');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const numeroMaximo = parseInt(input.value, 10);
    console.log('valor do input:', input.value, 'parsed:', numeroMaximo);

    if (isNaN(numeroMaximo) || numeroMaximo <= 0) {
      resultado.textContent = 'Por favor, insira um número válido maior que zero.';
      resultado.style.color = 'crimson';
      return;
    }

    const numeroSorteado = Math.floor(Math.random() * numeroMaximo) + 1;
    resultado.textContent = `Número sorteado: ${numeroSorteado}`;
    resultado.style.color = ''; // remove cor de erro se houver
  });
});
