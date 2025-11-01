const botao_Adicionar = $("#btn")

botao_Adicionar.click(function(e) {
    e.preventDefault();
    
    // Variáveis para função click
    const tarefa_Input = $('#tarefa').val();
    const novoItem = $('<li></li>').text(tarefa_Input);
    const ul = $('#ul');

    $(novoItem).appendTo(ul);
    
})

$('ul').on('click', 'li', function() {
    $(this).toggleClass('concluido');
    if ($(this).hasClass('concluido')) {
        $(this).css('text-decoration', 'line-through');
        $(this).css('font-weight', 'bold');
    } else {
        $(this).css('text-decoration', 'none');
        $(this).css('font-weight', 'bold');
    }
})

