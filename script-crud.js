// Seleciona elementos HTML que serão usados na aplicação.
const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoDaTarefa = document.querySelector('.app__section-active-task-description');
const botaoRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const botaoRemoverTodas = document.querySelector('#btn-remover-todas');

// Carrega tarefas do localStorage ou define uma lista vazia.
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let taredaSelecionada = null;  // Armazena a tarefa atualmente selecionada.
let listaTaredaSelecionada = null;  // Armazena o elemento da lista atualmente selecionado.

// Atualiza as tarefas no localStorage.
function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Cria um elemento de tarefa na lista.
function criarElementoTarefa(tarefa) {
    const lista = document.createElement('li');
    lista.classList.add('app__section-task-list-item');

    // Cria o ícone de status da tarefa.
    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    // Cria o parágrafo com a descrição da tarefa.
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    // Cria o botão de edição da tarefa.
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    // Adiciona um evento de clique ao botão de edição.
    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    };

    // Adiciona a imagem do botão de edição.
    const imagemDoBotao = document.createElement('img');
    imagemDoBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemDoBotao);

    // Adiciona os elementos à lista.
    lista.append(svg);
    lista.append(paragrafo);
    lista.append(botao);

    // Se a tarefa está completa, adiciona a classe correspondente e desabilita o botão de edição.
    if (tarefa.completa) {
        lista.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        // Adiciona um evento de clique ao item da lista para selecionar a tarefa.
        lista.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            });

            if (taredaSelecionada == tarefa) {
                paragrafoDescricaoDaTarefa.textContent = '';
                taredaSelecionada = null;
                listaTaredaSelecionada = null;
                return;
            }

            taredaSelecionada = tarefa;
            listaTaredaSelecionada = lista;

            paragrafoDescricaoDaTarefa.textContent = tarefa.descricao;
            lista.classList.add('app__section-task-list-item-active');
        }
    }

    return lista;
}

// Adiciona um evento de clique ao botão de adicionar tarefa.
botaoAdicionarTarefa.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.toggle('hidden');
});

// Adiciona um evento de envio ao formulário de adicionar tarefa.
formularioAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    };
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    textArea.value = '';
    formularioAdicionarTarefa.classList.add('hidden');
});

// Carrega e exibe as tarefas salvas no localStorage ao iniciar.
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

// Adiciona um evento personalizado que marca a tarefa selecionada como completa.
document.addEventListener('FocoFinalizado', () => {
    if (taredaSelecionada && listaTaredaSelecionada) {
        listaTaredaSelecionada.classList.remove('app__section-task-list-item-active');
        listaTaredaSelecionada.classList.add('app__section-task-list-item-complete');
        listaTaredaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        taredaSelecionada.completa = true;
        atualizarTarefas();
    }
});

// Função para remover tarefas, opcionalmente apenas as completas.
const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";

    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });

    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefas();
}

// Adiciona eventos de clique aos botões de remover tarefas.
botaoRemoverConcluidas.onclick = () => removerTarefas(true);
botaoRemoverTodas.onclick = () => removerTarefas(false);
