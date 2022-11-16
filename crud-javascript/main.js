'use strict';

// CRUD - Create Read Uptade Delete


// CRUD - Create

// A função abaixo faz o papel de um select em uma consulta no banco de dados
// Se durante a consulta for constatado que o localStorage está vazio, será retornado um array vazio
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? []

// A função abaixo faz o papel de insert into durante uma inserção no banco usando como parametro um objeto com os dados a serem inseridos
// localStorage.setItem: Insere um item no localStorage
// JSON.stringify: Converte o JSON para string (pq o localstorage só armazena strings)
const setLocalStorage = (dbClient) => localStorage.setItem('dbClient', JSON.stringify(dbClient));

// Função responsavel por deletar um cliente (usa como parametro a posição do cliente a ser deletado)
const deleteClient = (index) => {
    // Faz uma leitura no localStorage atravez da função readClient, e armazena na variavel dbClient
    const dbClient = readClient();

    // Retira o cliente do array utilizando o metodo splice retirando 1 item a partir da posição que for passada como parametro
    dbClient.splice(index, 1);

    // "Atualiza" o banco 
    setLocalStorage(dbClient);
}

// Função responsavel por editar o cliente (recebe dois parametros: os novos dados e a posição do cliente)
const updateClient = (client, index) => {
    // faz uma leitura do banco e armazena na variavel dbClient
    const dbClient = readClient();

    // Pega o cliente da posição desejada a partir da leitura anterior e atribui os novos dados a ele
    dbClient[index] = client;

    // Atualiza o banco
    setLocalStorage(dbClient);
}

// Função que faz a leitura do banco 
const readClient = () => getLocalStorage();

// Função que cria um novo cliente no banco (recebe como parametro o obj client)
const createClient = (client) => {
    // faz uma leitura no banco
    const dbClient = getLocalStorage();

    // Insere no array o obj client
    dbClient.push(client);

    // Atualiza o banco
    setLocalStorage(dbClient);
}

// DOM

// Função que verifica se o html reportou algum campo não preenchido no formulario de cadastro (true ou false)
const isValidFields = () => {
    return document.getElementById('form-cadastro').reportValidity();
}

// Função que verifica se o html reportou algum campo não preenchido no formulario de editar (true ou false)
const isValidFieldsEdit = () => {
    return document.getElementById('form-edit').reportValidity();
}

// Função que limpa os campos
const clearFields = () => {
    const fields = document.querySelectorAll('.form-control');

    fields.forEach(field => {
        field.value = "";
    });

}

// Função que fecha o modal (dispara um evento de click no botão de X)
const closeModal = () => {
    document.getElementById('close-cadastro').click();
    document.getElementById('close-edit').click();
}

// Função que pega as informações da DOM e cria um obj a partir delas
const saveClient = (e) => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('cel').value,
            cidade: document.getElementById('cidade').value
        }

        // chama a função que cria um cliente no banco
        createClient(client);

        // previne o comportamento padrão do submit (recarregar a pag)
        e.preventDefault();

        // Limpa os campos
        clearFields();

        // Atualiza a table
        updateTable();

        // fecha o modal
        closeModal();
        // alert("Cliente cadastrado com sucesso!");
    }
}

// Cria uma row na table (recebe como parametro as informações que serão add e a posição do resgistro no "banco")
const createRow = (registro, index) => {
    // Cria um elemento TableRow
    const newRow = document.createElement('tr');

    // Add conteudo a este novo elemento 
    newRow.innerHTML += `
        <th scope="row">${index + 1}</th>
        <td>${registro.nome}</td>
        <td>${registro.email}</td>
        <td>${registro.celular}</td>
        <td>${registro.cidade}</td>
        <td>
            <button class="btn btn-info" id="edit-${index}">Editar</button>
            <button class="btn btn-danger" id="delete-${index}">Remover</button>
        </td>
    `

    // Insere o novo elemento dentro do body da tabela já existente no HTML
    document.getElementById('cadastro-table-body').appendChild(newRow);
}

// Função que limpa a tabela
const clearTable = () => {
    // const rows = document.querySelectorAll('#cadastro-table-body tr');

    // rows.forEach(row => {
    //     row.parentNode.removeChild(row);
    // });

    document.getElementById('cadastro-table-body').innerHTML = "";
}

// Função que atualiza a table
const updateTable = () => {
    // Lê a informações do banco
    const dbClient = readClient();

    // Limpa a table
    clearTable();

    // Percorre as informações do banco e chama a função para criar as linhas
    dbClient.forEach(createRow);
}

// Preenche os campos do form de editar com as informações do cliente selecionado
const fillFields = (client) => {
    document.getElementById('nome_edit').value = client.nome;
    document.getElementById('cel_edit').value = client.celular;
    document.getElementById('email_edit').value = client.email;
    document.getElementById('cidade_edit').value = client.cidade;
}

// Editar cliente
const editClient = (i) => {
    // Le os dados somente do cliente com a posição especifica
    const client = readClient()[i];

    // Chama a função que preenche campos e envia as informações lidas do cliente especifico
    fillFields(client);

    // add evento de click no botão de salvar edições
    document.getElementById('save-edit').addEventListener('click', (e) => {
        // Se os campos forem validos (não estiverem vazio)
        if (isValidFieldsEdit()) {
            const client_edit = {
                nome: document.getElementById('nome_edit').value,
                email: document.getElementById('cel_edit').value,
                celular: document.getElementById('email_edit').value,
                cidade: document.getElementById('cidade_edit').value
            }

            // armazena o index atravez do atributo dataset do HTML
            const index = e.target.dataset.index;

            updateClient(client_edit, index);
            updateTable();
            closeModal();
            e.preventDefault();
        }
    });
}

// Função que identifica qual ação tomar
const editDelete = (e) => {
    // separa o id em dois e pega o segundo item
    const [, index] = e.target.id.split('-');

    // se o botão conter a classe danger (vermelho)
    if (e.target.classList.contains('btn-danger')) {
        // Lê o cliente especifico
        const client = readClient()[index];

        // envia uma notificação e armazena a resposta em uma variavel
        const resp = confirm(`Desja remover o cliente ${client.nome}`);

        // Se a respoosta for true o cliente será deletado e a table será atualizada
        if (resp) {
            deleteClient(index);
            updateTable();
        }

    } else if (e.target.classList.contains('btn-info')) {
        editClient(index);
        var myModal = new bootstrap.Modal(document.getElementById('modal-editar'));
        myModal.show();

        document.getElementById('save-edit').dataset.index = index;
    }
}

// Atualiza a table logo de inicio
updateTable();

// createClient(tempClient);

// evento no botão de salvar cliente e chama a função saveClient
document.getElementById('salvar')
    .addEventListener('click', saveClient);

// Add evento no body da tabela e chama a função que identifica qual o alvo do evento
document.querySelector('#cadastro-table-body')
    .addEventListener('click', editDelete);
