'use strict';

const btn = document.getElementById('action');

const countDown = (e) => {
    // função que formata os digitos, recebe os digitos como parametro
    const formatarDigito = (num) => {

        // retorna uma string template, cortando a partir da segunda casa da direita para a esquerda (se tiver 012 o retorno será 12)
        return `0${num}`.slice(-2);
    }

    // Função quer atualiza o tempo, recebe como parametro o tempo
    const atualizar = (time) => {

        // armazena em constantes os elementos html onde serão impressos os valores
        const sec = document.getElementById('seconds');
        const min = document.getElementById('minutes');
        const hours = document.getElementById('hours');
        const days = document.getElementById('days');

        // segundos recebe o resto da divisão do tempo por 60 (se for 100, serão 40 segundos)
        const qtdSegundos = time % 60;

        // minutos recebe o resto da divisão do tempo por 60 * 60, divido por 60 pra passar pra minutos e floor passa pra inteiro
        const qtdMinutos = Math.floor((time % (60 * 60)) / 60);

        // horas recebe o resto da divisão do tempo por 60 * 60 * 24, divido por 60 * 60 pra passar pra horas
        const qtdHoras = Math.floor((time % (60 * 60 * 24)) / (60 * 60));

        // dias recebe o resultado da divisão por 60 * 60 * 24 para converter segundos para dias
        const qtdDias = Math.floor(time / (60 * 60 * 24));

        // imprime o tempo já formatado
        sec.textContent = formatarDigito(qtdSegundos);
        min.textContent = formatarDigito(qtdMinutos);
        hours.textContent = formatarDigito(qtdHoras);
        days.textContent = formatarDigito(qtdDias);
    }

    // Função responsavel pela contagem regressiva em si, recebe o tempo como parametro
    const contagemRegressiva = (time) => {
        // Função que para o inverval, recebe como parametro o id do interval
        const pararContagem = (id) => {
            clearInterval(id)
        }

        // função vai reduzindo os valores
        const contar = () => {
            // se tempo for 0 a função parar contagem será executada
            if (time == 0) {
                pararContagem(id);
            }

            // chama a função atualizar
            atualizar(time);

            // a cd iteração o tempo será reduzido em 1
            time--;

        };

        // cria um intervalo e armazena o id em uma constante
        const id = setInterval(contar, 1000);
    }

    // função que pega o time
    const data_time = document.getElementById('data').value;
    const tempoRestante = () => {

        var data = data_time.split('T')[0];
        var tempo = data_time.split('T')[1];

        // data do evento que deseja calcular
        const dataEvento = new Date(`${data} ${tempo}`);

        // data e hr atual em ms
        const hj = Date.now();

        // pega o intervalo entre o momento atual e o evento e divide por 1000 (pois está em ms), e dps converte para um valor sem decimais;
        return Math.floor((dataEvento - hj) / 1000);
    }

    // chamada da função principal
    if (data_time != "") {
        contagemRegressiva(tempoRestante());

    } else {
        alert("Campo vazio");
    }
}

btn.addEventListener('click', countDown);
// btn.addEventListener('click', (e)=> {
//     if(e.target.hasAttribute('data-bs-dismiss')){
//         e.target.removeAttribute('data-bs-dismiss');
//     }
// });