// Armazena o botão em uma variavel atraves do DOM
var btn = document.querySelector('#action');

// Função que calcula o IMC
function calc() {
    // Armazena os valores digitados nos campos e o display em variaveis
    var name = document.querySelector('#name').value;
    var altura = document.querySelector('#h').value;
    var peso = document.querySelector('#p').value;
    var display = document.querySelector('#display');

    // validação: caso os campos estejam preenchidos o bloco de comando será executado
    if ((name !== '') && (altura !== '') && (peso !== '')) {
        // Uma constante que calcula o imc atraves da formula
        const imc = (peso / (altura * altura));

        // Inicializa a classificação em 0, que posteriormente recebera as informações sobre a classificação do IMC
        let classify = "";

        // Condicionais para classificar o imc
        if (imc <= 18) {
            // Atribui o texto em String a valiavel classify
            classify = "Abaixo do peso normal";
        }
        else if (imc > 19 && imc < 25) {
            classify = "Peso normal";
        }
        else if (imc > 26 && imc < 30) {
            classify = "Excesso de peso";
        }
        else if (imc > 31 && imc < 35) {
            classify = "Obesidade classe I";
        }
        else if (imc > 35 && imc < 39) {
            classify = "Obesidade classe II";
        }
        else if (imc > 39) {
            classify = "Obesidade classe III";
        }

        // Zera o conteudo do display
        display.textContent = ``;

        // Imprime no display uma String template com as informações do imc e a classificação já formatados
        display.textContent = `${name}, seu imc é ${imc.toFixed(1)}, ${classify}`;

    } else {
        // Caso os campos não sejam preenchidos será imprimida uma mensagem no display informando.
        display.textContent = `Campos não preenchidos!!`;
    }
}

// Cria um evento de click no botão e executa a função calc resposavel pelas operações anteriores
btn.addEventListener('click', calc);