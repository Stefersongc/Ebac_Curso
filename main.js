const form = document.getElementById('form-contato')
const nome = []
const telefone = []

let linhas = ''

form.addEventListener('submit', function(e) {
  e.preventDefault()

  adicionaLinha()
  atualizaTabela()
  atualizaContador()
})

function adicionaLinha() {
  const inputNomeContato = document.getElementById('Nome')
  const inputTelefoneContato = document.getElementById('number')

  const nomeValido = /^[A-Z].*/.test(inputNomeContato.value)

  if (!nomeValido) {
    alert("O nome deve começar com letra maiúscula.")
    return
  }

  if (nome.includes(inputNomeContato.value)) {
    alert(`O nome: ${inputNomeContato.value} já foi inserido, por favor cadastre outro nome ou adicione um sobrenome`)
  } else if (telefone.includes(inputTelefoneContato.value)) {
    alert(`O telefone: ${inputTelefoneContato.value} já foi inserido, por favor cadastre outro número`)
  } else {
    nome.push(inputNomeContato.value)
    telefone.push(inputTelefoneContato.value)

    let linha = '<tr>'
    linha += `<td>${inputNomeContato.value}</td>`
    linha += `<td>${inputTelefoneContato.value}</td>`
    linha += '<tr>'

    linhas += linha
  }

  inputNomeContato.value = ''
  inputTelefoneContato.value = ''
}

function atualizaTabela() {
  const corpoTabela = document.querySelector('tbody')
  corpoTabela.innerHTML = linhas
}

function atualizaContador() {
  const contatosCadastrados = nome.length
  document.getElementById("contatos").innerText = contatosCadastrados
}
