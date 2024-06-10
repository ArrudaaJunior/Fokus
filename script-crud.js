const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

const tarefas = []

botaoAdicionarTarefa.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.toggle('hidden');
})

formularioAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', tarefas);
})