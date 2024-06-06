const html = document.querySelector('html');
const focoButao = document.querySelector('.app__card-button--foco');
const curtoButao = document.querySelector('.app__card-button--curto');
const longoButao = document.querySelector('.app__card-button--longo');

focoButao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
})

curtoButao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
})

longoButao.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
})