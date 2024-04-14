function validaSeExisteTarefasNoLocalStorageEMostraNaTela() {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        listaTarefas.forEach(tarefa => {
            if (tarefa.status === 'fechada') {
                criaNovoItemDaLista(tarefa.descricao, false, false)  
            }else{
                criaNovoItemDaLista(tarefa.descricao, true, false)  
            }
        });
    }
}

function disabilitaBotaoAdicionar(){
    
}

function criaElementosAdicionar(){

    const divTarefas = document.getElementById('div_area_nova_tarefa');

    const novolabel = document.createElement('label');
    novolabel.setAttribute('for', 'input_nova_tarefa');
    novolabel.innerHTML = 'Digite sua nova tarefa:';

    const novoinput = document.createElement('input');
    novoinput.setAttribute('id', 'input_nova_tarefa');
    novoinput.setAttribute('type', 'text');

    const novolbutton = document.createElement('button');
    novolbutton.setAttribute('id', 'mostrar_botao');
    novolbutton.setAttribute('onclick', `adicionaTarefaNaLista()`);
    novolbutton.innerHTML = '+';
    novolbutton.setAttribute('disabled', 'true');

    divTarefas.appendChild(novolabel);
    divTarefas.appendChild(novoinput);
    divTarefas.appendChild(novolbutton);

    const input = document.getElementById("input_nova_tarefa");

    adicionarEventListener(input)
}

function adicionaTarefaNaLista() {

    const novaTarefa = document.getElementById('input_nova_tarefa');
    criaNovoItemDaLista(novaTarefa.value, true, true);
    novaTarefa.value = "";
    disabilitaBotaoAdicionar();
}

function criaNovoItemDaLista(textoDaTarefa, eDesabilitado, refreshDaPagina) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li');
    const textoItem = document.createElement('a');

    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id, !eDesabilitado))
    
    textoItem.innerText = textoDaTarefa
    

    const criarBotao = document.createElement('button');
    criarBotao.setAttribute('onclick', `ocultarElemento('${novoItem.id}')`);
    criarBotao.setAttribute('id', `ocultar_${novoItem.id}`);
    criarBotao.setAttribute('class', 'botao-ocultar');
    criarBotao.innerText = 'Ocultar';
    if(eDesabilitado){
        criarBotao.disabled = true;
    }else{
        criarBotao.disabled = false;
        textoItem.style = 'text-decoration: line-through;';
    }
    
    novoItem.appendChild(textoItem)
    novoItem.appendChild(criaIconEditarItemLista(novoItem.id))
    novoItem.appendChild(criarBotao);

    const mostrarBotao = document.getElementById('mostrar_botao');
    if(eDesabilitado){
        mostrarBotao.setAttribute('disabled', 'true');
    }else{
        mostrarBotao.setAttribute('disabled', 'false');
    }

    listaTarefas.appendChild(novoItem);

    if(refreshDaPagina){
        const tarefa = montaTarefa(novoItem.id, textoDaTarefa, 'aberta')
        adicionaTarefaAListaLocalStorage(tarefa)
    }
}


function criaInputCheckBoxTarefa(idTarefa, checkboxMarcado) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    inputTarefa.setAttribute('id', `checkbox_${idTarefa}`);
    if(checkboxMarcado){
        inputTarefa.checked = true;
    }
    return inputTarefa
}

function criaIconEditarItemLista(idTarefa){
    const novoElemento = document.createElement('i');
    novoElemento.setAttribute('class', 'bi bi-pencil-square');
    novoElemento.setAttribute('onclick', `editarElemento('${idTarefa}')`);
    return novoElemento
}

function editarElemento(idTarefa){

    const elementoEditar = document.getElementById('div_editar_Item');

    if(!elementoEditar.hasChildNodes()){
        const elementoValorEditar = document.getElementById(idTarefa);
        const labelEditarTarefa = document.createElement('label');
        const inputEditarTarefa = document.createElement('input');
        const botaoEditarTarefa = document.createElement('button');

        const removerElementos = document.getElementById('div_area_nova_tarefa');
        removerElementos.innerHTML = ''

        labelEditarTarefa.setAttribute('for', `editar_${idTarefa}`);
        labelEditarTarefa.innerHTML = 'Reescreva sua tarefa:';

        inputEditarTarefa.setAttribute('id',`editar_${idTarefa}`);
        inputEditarTarefa.setAttribute('class', 'input-editar');
        inputEditarTarefa.setAttribute('value', elementoValorEditar.children[1].innerText);

        botaoEditarTarefa.setAttribute('onclick', `salvaEdicao('${idTarefa}')`);
        botaoEditarTarefa.setAttribute('class', 'botao-salva-edicao');
        botaoEditarTarefa.innerHTML = 'Save';        

        elementoEditar.appendChild(labelEditarTarefa);
        elementoEditar.appendChild(inputEditarTarefa);
        elementoEditar.appendChild(botaoEditarTarefa);
    }
}

function salvaEdicao(idTarefa){
    const elementoValorEditar = document.getElementById(`editar_${idTarefa}`);
    const elementoEditar = document.getElementById(`${idTarefa}`);
    const checadoOuNao = elementoEditar.style;

    const textoDaTarefa = elementoValorEditar.value;
    elementoEditar.innerHTML = ''

    elementoEditar.appendChild(criaInputCheckBoxTarefa(idTarefa, false));
    const textoTarefa = document.createElement('a');
    textoTarefa.setAttribute('id', `${idTarefa}`);

    textoTarefa.innerHTML = textoDaTarefa;

    elementoEditar.appendChild(textoTarefa);
    elementoEditar.appendChild(criaIconEditarItemLista(idTarefa));

    const criarBotao = document.createElement('button');
    criarBotao.setAttribute('onclick', `ocultarElemento('${idTarefa}')`);
    criarBotao.setAttribute('id', `ocultar_${idTarefa}`);
    criarBotao.setAttribute('class', 'botao-ocultar');
    criarBotao.innerHTML = 'Ocultar';

    if(checadoOuNao.textDecoration == 'line-through'){
        document.getElementById(`checkbox_${idTarefa}`).checked = true;
        criarBotao.disabled = false;
        mudaEstadoTarefaLocalStorage(idTarefa, true)
    }else{
        criarBotao.disabled = true;
        mudaEstadoTarefaLocalStorage(idTarefa, false)
    }
    elementoEditar.appendChild(criarBotao);

    const removerElementos = document.getElementById('div_editar_Item');
    removerElementos.innerHTML = ''

    criaElementosAdicionar()
    mudaTextoTarefaLocalStorage(idTarefa, textoDaTarefa);
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa).children[1];
    const mostrarBotao = document.getElementById(`ocultar_${idTarefa}`);
    
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
        mostrarBotao.disabled = true;
        mudaEstadoTarefaLocalStorage(idTarefa, false)
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
        mostrarBotao.disabled = false;
        mudaEstadoTarefaLocalStorage(idTarefa, true)
    }
    
}

function ocultarElemento(idTarefa){
    const elemento = document.getElementById(idTarefa);
    const mostrarBotao = document.getElementById('ocultar_elementos');
    mostrarBotao.disabled = false;
    elemento.style = 'display: none';
}

function mostrarElementosOcultados(){
    var tagsComAtributoEspecifico = document.querySelectorAll('[style]');

    tagsComAtributoEspecifico.forEach(function(tag) {
        if(tag.style = 'display: none'){
            tag.style = 'text-decoration: line-through;';
        }
    });

    const mostrarBotao = document.getElementById('ocultar_elementos');
    mostrarBotao.disabled = true;

}

function adicionarEventListener(input) {
    input.addEventListener('input', function(event) {
        const botao = document.getElementById("mostrar_botao");
        if (input.value.length > 0) {
            botao.disabled = false;
        } else {
            botao.disabled = true;
        }
    });
}

function mudaTextoTarefaLocalStorage(idTarefa, textoEditado) {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        let contador = 0
        listaTarefas.forEach(tarefa => {
            if (tarefa.id === idTarefa) {
                tarefa.descricao = textoEditado;
            }
            localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
            contador++
        });

    }
}

function mudaEstadoTarefaLocalStorage(idTarefa, eFinalizada) {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        let contador = 0
        listaTarefas.forEach(tarefa => {
            if (tarefa.id === idTarefa) {
                if (eFinalizada) {
                    tarefa.status = 'fechada'
                } else {
                    tarefa.status = 'aberta'
                }
                console.log(tarefa)
            }
            localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
            contador++
        });

    }
}

function adicionaTarefaAListaLocalStorage(tarefa) {
    const localStorage = window.localStorage
    let listaTarefas = []
    if (localStorage.getItem('lista_tarefas') != null) {
        listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
    }
    listaTarefas.push(tarefa)
    localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
}

function montaTarefa(idTarefa, textoTarefa, status) {
    return {
        id: idTarefa,
        descricao: textoTarefa,
        status: status
    }
}

const input = document.getElementById("input_nova_tarefa");

adicionarEventListener(input)

// ao script ser carregado roda essa funcao
validaSeExisteTarefasNoLocalStorageEMostraNaTela()
