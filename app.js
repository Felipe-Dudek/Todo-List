function criaElementosAdicionar(){
    //<label for="input_nova_tarefa">Digite sua nova tarefa:</label>
    //   <input type="text" id="input_nova_tarefa">
    //   <button onclick="adicionaTarefaNaLista()">+</button>
    const divTarefas = document.getElementById('div_area_nova_tarefa');

    const novolabel = document.createElement('label');
    novolabel.setAttribute('for', 'input_nova_tarefa');
    novolabel.innerHTML = 'Digite sua nova tarefa:';

    const novoinput = document.createElement('input');
    novoinput.setAttribute('id', 'text');
    novoinput.setAttribute('type', 'input_nova_tarefa');

    const novolbutton = document.createElement('button');
    novolbutton.setAttribute('onclick', `adicionaTarefaNaLista()`);
    novolbutton.innerHTML = '+';
    novolbutton.disabled = true;

    divTarefas.appendChild(novolabel);
    divTarefas.appendChild(novoinput);
    divTarefas.appendChild(novolbutton);
}

function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa');
    criaNovoItemDaLista(novaTarefa.value);
    novaTarefa.value = "";
    disabilitaBotaoAdicionar();
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li');
    const textoItem = document.createElement('a');

    novoItem.id = `tarefa_id_${qtdTarefas++}`

    // adiciona o texto digitado no texto da tarefa
    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))
    
    textoItem.innerText = textoDaTarefa
    novoItem.appendChild(textoItem)
    // adiciona um ID no novo elemento
    
    novoItem.appendChild(criaIconEditarItemLista(novoItem.id))

    const criarBotao = document.createElement('button');
    criarBotao.setAttribute('onclick', `ocultarElemento('${novoItem.id}')`);
    criarBotao.setAttribute('id', `ocultar_'${novoItem.id}'`);
    criarBotao.setAttribute('class', 'botao-ocultar');
    criarBotao.innerHTML = 'Ocultar';
    criarBotao.disabled = true;
    novoItem.appendChild(criarBotao);

    listaTarefas.appendChild(novoItem)
}


function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    inputTarefa.setAttribute('id', `checkbox_${idTarefa}`);
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

    elementoEditar.appendChild(criaInputCheckBoxTarefa(idTarefa));
    const textoTarefa = document.createElement('a');
    textoTarefa.setAttribute('id', `${idTarefa}`);

    textoTarefa.innerHTML = textoDaTarefa;

    elementoEditar.appendChild(textoTarefa);
    elementoEditar.appendChild(criaIconEditarItemLista(idTarefa));

    const criarBotao = document.createElement('button');
    criarBotao.setAttribute('onclick', `ocultarElemento('${idTarefa}')`);
    criarBotao.setAttribute('id', `ocultar_'${idTarefa}'`);
    criarBotao.setAttribute('class', 'botao-ocultar');
    criarBotao.innerHTML = 'Ocultar';

    if(checadoOuNao.textDecoration == 'line-through'){
        document.getElementById(`checkbox_${idTarefa}`).checked = true;
        criarBotao.disabled = false;
    }else{
        criarBotao.disabled = true;
    }
    elementoEditar.appendChild(criarBotao);

    const removerElementos = document.getElementById('div_editar_Item');
    removerElementos.innerHTML = ''

    criaElementosAdicionar()
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa).children[1];
    const mostrarBotao = document.getElementById(`ocultar_'${idTarefa}'`);
    
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
        mostrarBotao.disabled = true;
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
        mostrarBotao.disabled = false;
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

function disabilitaBotaoAdicionar(){
    if (input.value.length > 0) {
        botao.disabled = false;
    } else {
        botao.disabled = true;
    }
}

const input = document.getElementById("input_nova_tarefa");
const botao = document.getElementById("mostrar_botao");

input.addEventListener("input", disabilitaBotaoAdicionar);
