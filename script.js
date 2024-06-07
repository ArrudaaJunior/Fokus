const html = document.querySelector('html');
const focoButao = document.querySelector('.app__card-button--foco');
const curtoButao = document.querySelector('.app__card-button--curto');
const longoButao = document.querySelector('.app__card-button--longo');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const startPauseBotao = document.querySelector('#start-pause');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    }else{
        musica.pause();
    }
})

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

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        alert('Tempo finalizado');
        return;
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos);
}

startPauseBotao.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        zerar();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}