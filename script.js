const html = document.querySelector('html');
const focoButao = document.querySelector('.app__card-button--foco');
const curtoButao = document.querySelector('.app__card-button--curto');
const longoButao = document.querySelector('.app__card-button--longo');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

focoButao.addEventListener('click', () => {
   alterarContexto('foco');
})

curtoButao.addEventListener('click', () => {
   alterarContexto('descanso-curto');
})

longoButao.addEventListener('click', () => {
   alterarContexto('descanso-longo');
})

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
}