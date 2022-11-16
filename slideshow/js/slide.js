// Um array de objetos, onde cada objeto tem os atributos: id e url(caminho da imagem)
const images = [
    { 'id': '1', 'url': './img/chrono.jpg' },
    { 'id': '2', 'url': './img/inuyasha.jpg' },
    { 'id': '3', 'url': './img/ippo.png' },
    { 'id': '4', 'url': './img/tenchi.jpg' },
    { 'id': '5', 'url': './img/tenjhotenge.jpg' },
    { 'id': '6', 'url': './img/yuyuhakusho.jpg' },
]

// armazena o container em uma variavel
const containerItems = document.querySelector('#container-items');


// função principal para carregar as imagens de forma "dinamica"
const loadImages = (imgs, container) => {

    // percorre o array de objs e a cada iteração add um conteudo ao container
    imgs.forEach(item => {
        container.innerHTML += `
        <div class="item">
        <img src="${item.url}">
        </div>
        `
    });
}

// Chamando a função passando como parametro o conteudo e o local onde será impresso o conteudo
loadImages(images, containerItems);

// armaneza na variavel um array com o conteudo dos itens criado de forma dinamica
let items = document.querySelectorAll('.item');

// função que passa para o proximo item do slide
const next = () => {
    // Passa o primeiro item do array items para a ultima posição no container
    containerItems.appendChild(items[0]);

    // Atualiza a variavel items
    items = document.querySelectorAll('.item');
}

// função que passa para o item anterior do slide
const previous = () => {
    // Armazena qual o ultimo item do arrray 
    const lastItem = items[items.length - 1];

    // Passa o ultimo item do array para a primeira posição no container 
    containerItems.insertBefore(lastItem, items[0]);

    // Atualiza a variavel 
    items = document.querySelectorAll('.item');
}

// Add o evento click ao botão previous, e executa a função next
document.querySelector('#next').addEventListener('click', next)

// Add o evento de click ao botão previous, e executa a função previous
document.querySelector('#previous').addEventListener('click', previous)