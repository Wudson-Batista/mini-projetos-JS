'use strict';

// Obj onde o indice é igual a uma letra e o value recebe o som
const songs = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav'
}

// função que cria dinamicamente as divs recebendo como parametro o conteudo que será passado para a div 
const createDiv = (div_text_content) => {

    // Cria uma div e armazena na variavel
    const div = document.createElement('div');

    // add a classe key ao elemento div criado antes
    div.classList.add('key');

    // Add um conteudo a div
    div.textContent = div_text_content;

    // Add um id a div
    div.id = div_text_content;

    // Imprime a div dentro do container
    document.getElementById('container').appendChild(div);
}

// Função que percorre um array criado a partir das keys do obj e a cada iteração cria uma div usando a função de criação
const show_songs = (songs) => Object.keys(songs).forEach(createDiv);

// função que da play no som usando como parametro a letra 
const play_song = (letter) => {
    const audio = new Audio(`./sounds/${songs[letter]}`);
    audio.play();
}

// função que adiciona o efeito ao add uma classe na div criada dinamicamente
const add_effect = (letter) => {
    document.getElementById(letter)
        .classList.add('active');
}

// função que remove o efeito ao add uma classe na div criada dinamicamente
const remove_effect = (letter) => {
    const div = document.getElementById(letter);
    const remove_active = () => div.classList.remove('active');

    // evento que permite o termino do efeito 
    div.addEventListener('transitionend', remove_active);
}

// Função que ativa tds os eventos
const active_div = (event) => {
    let letter = '';

    // Verifica o tipo de evento disparado
    if (event.type == 'click') {
        letter = event.target.id;
    } else {
        letter = event.key.toUpperCase();
    }

    // verifica se a letra corresponde a algum item do obj
    const letter_permited = songs.hasOwnProperty(letter);
    if (letter_permited) {
        // chamada das funções
        add_effect(letter);
        play_song(letter);
        remove_effect(letter);
    }
}

// chamada da função que mostra as divs criadas
show_songs(songs);

// cria um evento de click e passa a função active_div
document.getElementById('container')
    .addEventListener('click', active_div);

// cria um evento de keydown e passa a função active_div
window.addEventListener('keydown', active_div)