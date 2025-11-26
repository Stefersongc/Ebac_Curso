function adicionar() {
    const input = document.getElementById("tarefaInput");
    const texto = input.value.trim();

    if (!texto) {
        alert("Digite alguma tarefa!");
        return;
    }

    const lista = document.getElementById("lista");
    const li = document.createElement("li");

    li.innerHTML = `
        <span onclick="concluir(this)">${texto}</span>
        <button onclick="remover(this)">X</button>
    `;

    lista.appendChild(li);
    input.value = "";
}

function concluir(el) {
    el.parentElement.classList.toggle("feito");
}

function remover(btn) {
    btn.parentElement.remove();
}
