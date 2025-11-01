const form = document.getElementById("form-atividade");
const imgAprovado = `<img src="./imagens/aprovado.png" alt="Emoji Celebrando"/>`;
const imgReprovado = `<img src="./imagens/reprovado.png" alt="Emoji Decepcionado"/>`;
let linhas = "";
const atividades =[];
const notas = [];
const spanAprovado = '<Span class="resultado aprovado"> Aprovado </span>';
const spanReprovado = '<Span class="resultado reprovado"> Reprovado </span>';

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    adicionaLinha()
    atualizaTabela()
    atualizaMediaFinal()
    
})

function adicionaLinha() {
const InputnomeAtividade = document.getElementById("nome-atividade");
const InputnotaAtividade = document.getElementById("nota-atividade");

    if (atividades.includes(InputnomeAtividade.value)) {
        alert(`A atividade: ${InputnomeAtividade.value} já foi inserida`)
    } else {
        atividades.push(InputnomeAtividade.value)
        notas.push(parseFloat(InputnotaAtividade.value))

        let linha = "<tr>";

        linha += `<td>${InputnomeAtividade.value}</td>`
        linha += `<td>${InputnotaAtividade.value}</td>`
        linha += `<td>${InputnotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`
        linha += `</tr>`

        linhas += linha
    }
    InputnomeAtividade.value = ""
    InputnotaAtividade.value = ""
}

function atualizaTabela() {
    const corpoTabela = document.querySelector(`tbody`)
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal()

  document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
  document.getElementById('media-final-resultado').innerHTML = mediaFinal >= 7 ? spanAprovado : spanReprovado;

}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]
    }

    return somaDasNotas / notas.length
}
