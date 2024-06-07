const html = document.querySelector('html');
const focoButao = document.querySelector('.app__card-button--foco');
const curtoButao = document.querySelector('.app__card-button--curto');
const longoButao = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBotao = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBotao = document.querySelector('#start-pause span');
const iconePlayOuPause = document.querySelector('.app__card-primary-butto-icon');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');


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
        // audioTempoFinalizado.play()
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Tempo: ' + tempoDecorridoEmSegundos)
    console.log('Id: ' + intervaloId)
}

startPauseBotao.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBotao.textContent = "Pausar";
    iconePlayOuPause.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBotao.textContent = "Começar"
    iconePlayOuPause.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}