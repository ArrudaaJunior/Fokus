// Seleciona elementos HTML específicos usando seletores CSS.
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
const tempoNaTela = document.querySelector('#timer');

// Carrega arquivos de áudio para serem usados como música de fundo e efeitos sonoros.
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');

// Define variáveis de controle para o temporizador e o intervalo de contagem regressiva.
let tempoDecorridoEmSegundos = 1500;  // Tempo inicial de 25 minutos (1500 segundos).
let intervaloId = null;  // Armazena o ID do intervalo de contagem regressiva.

musica.loop = true;  // Faz a música tocar em loop.

// Adiciona um ouvinte de evento ao botão de alternar música.
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();  // Toca a música se estiver pausada.
    } else {
        musica.pause();  // Pausa a música se estiver tocando.
    }
});

// Adiciona ouvintes de evento para os botões de foco, descanso curto e descanso longo.
focoButao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 20;  // Define o tempo para 25 minutos.
    alterarContexto('foco');  // Altera o contexto para foco.
    focoButao.classList.add('active');  // Adiciona a classe 'active' ao botão de foco.
});

curtoButao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;  // Define o tempo para 5 minutos.
    alterarContexto('descanso-curto');  // Altera o contexto para descanso curto.
    curtoButao.classList.add('active');  // Adiciona a classe 'active' ao botão de descanso curto.
});

longoButao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;  // Define o tempo para 15 minutos.
    alterarContexto('descanso-longo');  // Altera o contexto para descanso longo.
    longoButao.classList.add('active');  // Adiciona a classe 'active' ao botão de descanso longo.
});

// Função para alterar o contexto da aplicação.
function alterarContexto(contexto) {
    mostrarTempo();  // Atualiza o tempo mostrado na tela.
    botoes.forEach(function (botao) {
        botao.classList.remove('active');  // Remove a classe 'active' de todos os botões.
    });
    html.setAttribute('data-contexto', contexto);  // Define um atributo de dados no elemento HTML.
    banner.setAttribute('src', `/imagens/${contexto}.png`);  // Altera a imagem do banner.
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
        default:
            break;
    }
}

// Função de contagem regressiva do temporizador.
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();  // Toca o som de tempo finalizado.
        alert('Tempo finalizado');  // Exibe um alerta.
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento)
        }
        zerar();  // Zera o temporizador.
        return;
    }
    tempoDecorridoEmSegundos -= 1;  // Decrementa o tempo.
    mostrarTempo();  // Atualiza o tempo mostrado na tela.
};

// Adiciona ouvinte de evento ao botão de iniciar/pausar.
startPauseBotao.addEventListener('click', iniciarOuPausar);

// Função para iniciar ou pausar o temporizador.
function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();  // Toca o som de pausa.
        zerar();  // Zera o temporizador.
        return;
    }
    audioPlay.play();  // Toca o som de início.
    intervaloId = setInterval(contagemRegressiva, 1000);  // Inicia a contagem regressiva a cada segundo.
    iniciarOuPausarBotao.textContent = "Pausar";  // Altera o texto do botão para "Pausar".
    iconePlayOuPause.setAttribute('src', `/imagens/pause.png`);  // Altera o ícone para pausa.
}

// Função para zerar o temporizador.
function zerar() {
    clearInterval(intervaloId);  // Limpa o intervalo de contagem regressiva.
    iniciarOuPausarBotao.textContent = "Começar";  // Altera o texto do botão para "Começar".
    iconePlayOuPause.setAttribute('src', `/imagens/play_arrow.png`);  // Altera o ícone para play.
    intervaloId = null;  // Reseta o ID do intervalo.
}

// Função para formatar e mostrar o tempo na tela.
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);  // Converte segundos para um objeto de data.
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'});  // Formata o tempo.
    tempoNaTela.innerHTML = `${tempoFormatado}`;  // Exibe o tempo formatado na tela.
}

// Mostra o tempo inicial na tela.
mostrarTempo();
