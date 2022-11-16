// armazena a imagem em uma variavel
const img = document.querySelector('#img');

// armazena o parent dos buttons 
const buttons = document.querySelector('#buttons');

// Inicia a posição das cores em 0
let colorIndex = 0;

// Inicia o id do intervalo como nulo
let intervalId = null;

// Função principal que "chama" as outras
const trafficLight = (event) => {
    stopAuto();

    // Chama a função turnOn no item especifico para alterar a cor
    turnOn[event.target.id]();
}

// Função que altera a posição das cores
const nextIndex = () => {
    // if (colorIndex < 2) {
    //     colorIndex++;
    //     console.log(colorIndex);
    // } else {
    //     colorIndex = 0;
    // }

    colorIndex = colorIndex < 2
        ? ++colorIndex
        : 0;
}

// Função responsavel por trocar as cores
const changeColor = () => {
    const colors = ['red', 'yellow', 'green'];
    const color = colors[colorIndex];
    turnOn[color]();
    nextIndex();
}

// Função que limpa o interval referente a troca automatica das cores
const stopAuto = () => {
    clearInterval(intervalId)
}

// Obj que recebe as funções referentes as cores
const turnOn = {
    'red': () => img.src = './img/vermelho.png',
    'yellow': () => img.src = './img/amarelo.png',
    'green': () => img.src = './img/verde.png',
    'auto': () => intervalId = setInterval(changeColor, 1000)
}

// add o evento ao botão
buttons.addEventListener('click', trafficLight);