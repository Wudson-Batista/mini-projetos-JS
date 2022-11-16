'use strict';

// Armazena o display em uma const
const display_content = document.getElementById('display_content');

// Armazena em uma constante um array com os items cujo atributo id possui em seu conteudo "key_" que referencia a uma tecla
const numbers = document.querySelectorAll('[id*=key_]');

// Armazena em uma constante um array com os items cujo atributo id possui em seu conteudo "operator_" que referencia a uma tecla de operação
const operators = document.querySelectorAll('[id*=operator_]');

// foi atribuido o valor boolean true a variavel NewNumber (resumindo ta dizendo que enquanto o valor for true o novo item não substituirá o anterior)
let newNumber = true;
let operator;
let previousNumber;

// Função responsavel por verificar se foi escolhida alguma operação
const haveOperation = () => operator !== undefined;

// Função principal do calculo
const calc = () => {
    // Se uma operação for escolhida:
    if (haveOperation()) {
        // pega o numero atual 
        const curNumber = parseFloat(display_content.textContent.replace(',', '.'));

        // um novo numero será add
        newNumber = true;

        // Calculo usando o metodo eval 
        const result = eval(`${previousNumber}${operator}${curNumber}`);

        // Chamada da função que atualiza o display passando como parametro o resultado da operação
        updateDisplay(result);

        // if (operator == '+') {
        //     updateDisplay(previousNumber + curNumber);
        // }
        // else if (operator == '-') {
        //     updateDisplay(previousNumber - curNumber);
        // }
        // else if (operator == '*') {
        //     updateDisplay(previousNumber * curNumber);
        // }
        // else if (operator == '/') {
        //     updateDisplay(previousNumber / curNumber);
        // }
    }
}

// Função que atualiza o display imprimindo o valor que receber como parametro
const updateDisplay = (text) => {
    // Se newNumber for true
    if (newNumber) {
        // Passa para moeda bt
        display_content.textContent = text.toLocaleString('BR');

        // o proximo numero não será um novo numero
        newNumber = false;
    } else {
        // Se não for um novo numero ele ira concatenar 
        display_content.textContent += text;
    }
}

// console.log(number);

// Insere o numero no display recebendo como parametro o evento 
const insertNumber = (event) => {
    // display_content.textContent = event.target.textContent;

    // Chama a função atualizar display, passando como parametro o textContent do alvo do evento, ou seja o conteudo do botão clicado
    updateDisplay(event.target.textContent);
}

// percore o array de teclas numericas
numbers.forEach(number => {

    // Add o evento de click, passando como callback a função de inserir os numeros
    number.addEventListener('click', insertNumber);
});

// Função que "PEGA" a operação
const selectOperator = (event) => {
    // Se newNumber for false
    if (!newNumber) {
        // chama a função calc 
        calc()
        newNumber = true;

        // Atribui o conteudo da tecla a variavel operator que foi inicializada como null
        operator = event.target.textContent;

        // pega o numero anterior
        previousNumber = parseFloat(display_content.textContent.replace(',', '.'));

        console.log(`${previousNumber}, ${operator}`);
    }
}

// percorre os operadores add um evento de click
operators.forEach(operator => {
    operator.addEventListener('click', selectOperator);
});

// Função igual
const equals = () => {
    calc();

    // zera o operador
    operator = undefined;
}

// Evento de igual no botão igual
document.getElementById('equals').addEventListener('click', equals);

// Função limpa display
const clearDisplay = () => {
    display_content.textContent = '';
}

// Função limpar calculo
const clearCalc = () => {
    clearDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}

const backspace = () => {
    display_content.textContent = display_content.textContent.slice(0, -1);
}

const invert = () => {
    newNumber = true;
    updateDisplay(display_content.textContent * -1);
}

const haveComma = () => display_content.textContent.indexOf(',') !== -1;
const haveValue = () => display_content.textContent.length > 0;

const insertDecimal = () => {
    if (!haveComma()) {
        if (haveValue()) {
            updateDisplay(',')
        } else {
            updateDisplay('0,')
        }
    }
}

document.getElementById('clear_display').addEventListener('click', clearDisplay);
document.getElementById('clear_calc').addEventListener('click', clearCalc);
document.getElementById('backspace').addEventListener('click', backspace);

document.getElementById('plus_minus').addEventListener('click', invert);

document.getElementById('comma').addEventListener('click', insertDecimal);

const keyMap = {
    '0': 'key_zero',
    '1': 'key_one',
    '2': 'key_two',
    '3': 'key_three',
    '4': 'key_four',
    '5': 'key_five',
    '6': 'key_six',
    '7': 'key_seven',
    '8': 'key_eight',
    '9': 'key_nine',
    'Backspace': 'backspace',
    '+': 'operator_plus',
    '-': 'operator_minus',
    '=': 'equals',
    '*': 'operator_multiply',
    '/': 'operator_divide',
    'c': 'clear_calc',
    ',': 'comma',
}

const mapKeys = (event) => {
    const key = event.key;

    const allowedKey = () => Object.keys(keyMap).indexOf(key) != -1;

    if (allowedKey()) document.getElementById(keyMap[key]).click();
}

document.addEventListener('keydown', mapKeys);
