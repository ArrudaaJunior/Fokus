const botaoAdicionarTarefa = document.querySelector('app__button--add-task');
const formularioAdicionar = document.querySelector('app__form-add-task');

botaoAdicionarTarefa.addEventListener('click', () => {
    formularioAdicionar.classList.toggle('hidden');
})