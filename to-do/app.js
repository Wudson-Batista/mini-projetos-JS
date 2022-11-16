'use strict';

// let banco = [
//     { 'task': 'estudar JS', 'status': '' },
//     { 'task': 'netflix', 'status': 'checked' },
//     { 'task': 'netflix', 'status': 'checked' },
// ];

const getBanco = () => {
    return JSON.parse(localStorage.getItem('todoList')) ?? [];
}
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));


const createItem = (text, status = '', index) => {
    const item = document.createElement('label');

    item.classList.add('todo-item',
        'd-flex',
        'justify-content-between',
        'border', 'p-3',
        'rounded',
        'align-items-center');
    item.innerHTML = `<input class="form-check-input p-2" type="checkbox" ${status} data-index="${index}">
    <div>${text}</div>
    <button type="button" class="btn fs-3 p-0 px-2 remove"><i data-index="${index}" class="fas fa-times remove"></i></button>`

    document.getElementById('list').appendChild(item);
}

// var btn = document.getElementById('add-item');
// btn.addEventListener('click', () => {
//     createItem(text);
// })

const limparTarefas = () => {
    const todoList = document.getElementById('list');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((element, index) => {
        createItem(element.task, element.status, index);
    });

}

const inserirItem = (e) => {
    const key = e.key;
    const texto = e.target.value;

    // console.log(key);
    if (key == 'Enter') {
        const banco = getBanco();
        banco.push({ 'task': texto, 'status': '' });
        setBanco(banco);
        atualizarTela();
        e.preventDefault();
        e.target.value = '';
    }
}

const removeItem = (index) => {
    const banco = getBanco();
    banco.splice(index, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (index) => {
    const banco = getBanco();
    banco[index].status = banco[index].status == ""
        ? 'checked'
        : "";
    setBanco(banco);
    atualizarTela();
}

const clickItem = (e) => {
    const elemento = e.target;

    if (elemento.classList.contains('remove')) {
        const index = elemento.dataset.index;
        removeItem(index);
    } else if (elemento.type == 'checkbox') {
        const index = elemento.dataset.index;
        atualizarItem(index);
    }
}

document.getElementById('text').addEventListener('keypress', inserirItem);
document.getElementById('list').addEventListener('click', clickItem);

atualizarTela();

