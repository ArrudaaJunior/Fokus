const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoDaTarefa = document.querySelector('.app__section-active-task-description');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let taredaSelecionada = null;
let lisTataredaSelecionada = null;

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const lista = document.createElement('li');
    lista.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        // debugger
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        // console.log('Nova descrição da tarefa: ', novaDescricao)
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    const imagemDoBotao = document.createElement('img');
    imagemDoBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemDoBotao);
    
    lista.append(svg);
    lista.append(paragrafo);
    lista.append(botao);

    lista.onclick = () => {

        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            });

        if (taredaSelecionada == tarefa) {
            paragrafoDescricaoDaTarefa.textContent = '';
            taredaSelecionada = null;
            lisTataredaSelecionada = null;
            return
        }

        taredaSelecionada = tarefa;
        lisTataredaSelecionada = lista;

        paragrafoDescricaoDaTarefa.textContent = tarefa.descricao;
        lista.classList.add('app__section-task-list-item-active');
    }

    return lista;
}

botaoAdicionarTarefa.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.toggle('hidden');
});

formularioAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    textArea.value = '';
    formularioAdicionarTarefa.classList.add('hidden');
});

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

document.addEventListener('FocoFinalizado', () => {
    if(taredaSelecionada && lisTataredaSelecionada) {
        lisTataredaSelecionada.classList.remove('app__section-task-list-item-active');
        lisTataredaSelecionada.classList.add('app__section-task-list-item-complete');
        lisTataredaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
    }
});