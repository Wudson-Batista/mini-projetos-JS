// Armazena em uma constante o botão/interruptor
const btn = document.querySelector('#btn');

// const turnOn = document.querySelector('#turnOn');
// const turnOff = document.querySelector('#turnOff');

// armazena em uma variavel a imagem da lampada
const lamp = document.querySelector('#lamp');

// Função responsavel por verificar se a lampada está quebrada
function isLampBroken() {
    // retorna um valor boolean, caso o atributo src da imagem tiver a palavra quebrado o valor será true, caso contrario será false 
    return lamp.src.indexOf('quebrada') > -1;
}

// Função Principal que chama as outras de acordo com a condição verificada
function turnOnOff() {
    // condicional que verifica o conteudo do button, caso o conteudo seja "Ligar" quer dizes a lampada esta desligada
    if (btn.textContent == "Ligar") {
        // Chama a função responsavel por "ligar a lampada"
        lampOn();

        // Troca o conteudo do button para "Desligar"
        btn.textContent = 'Desligar';

        // Troca a classe responsavel pelo estilo do button
        btn.classList.replace('btn-warning', 'btn-dark');

    } else {
        // Chama a função que "Desliga a lampada"
        lampOff();

        // Altera o conteudo do button para "ligar"
        btn.textContent = "Ligar";

        // Substitui a classe que estiliza o button
        btn.classList.replace('btn-dark', 'btn-warning');
    }
}

// Função que liga a lampada
function lampOn() {
    // Condicional que checa o resultado da função isLampBroken, e se a lampada não estiver quebrada o bloco abaixo será executado
    if (!isLampBroken()) {
        // altera o atributo src da lamp para a lampada ligada
        lamp.src = './img/ligada.jpg';
    } else {
        // Caso a condição verifique que a lampada esta quebrada, um alert será disparado informando que a lampada esta quebrada 
        alert('A lampada está quebrada!');
    }
}

// Função que "desliga a lampada" Funciona de forma semelhante a LampOn
function lampOff() {
    if (!isLampBroken()) {
        lamp.src = './img/desligada.jpg';
    } else {
        alert('A lampada está quebrada!');
    }
}

// Função que altera o src da imagem para a de uma lampada quebrada
function lampBroken() {
    lamp.src = './img/quebrada.jpg';
}

// turnOn.addEventListener('click', lampOn);
// turnOff.addEventListener('click', lampOff);

// Evento de click atribuido ao button, executando a função principal
btn.addEventListener('click', turnOnOff);

// Evento de click atribuido a imagem, executando a função que altera para a lampada quebrada;
lamp.addEventListener('click', lampBroken);