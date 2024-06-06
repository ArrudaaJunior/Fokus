const html = document.querySelector('html');
const focoButao = document.querySelector('.app__card-button--foco');
const curtoButao = document.querySelector('.app__card-button--curto');
const longoButao = document.querySelector('.app__card-button--longo');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

focoButao.addEventListener('click', () => {
   alterarContexto('foco');
   focoButao.classList.add('active');
})

curtoButao.addEventListener('click', () => {
   alterarContexto('descanso-curto');
   curtoButao.classList.add('active');
})

longoButao.addEventListener('click', () => {
   alterarContexto('descanso-longo');
   longoButao.classList.add('active');
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}