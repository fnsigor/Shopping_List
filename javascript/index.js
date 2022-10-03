
const lista = document.querySelector('.div-list ul')
let totalItemLista = 0
let lastCheckedItem
let listName




//adicionar eventos
document.getElementById('bt-create-item').addEventListener('click', createListItem)
document.querySelector('.pop-up-container.list-name button').addEventListener('click', setListName)
document.getElementById('bt-save-list').addEventListener('click', saveList)
document.getElementById('bt-delete-list').addEventListener('click', deleteList)
document.getElementById('input-novo-item').addEventListener('keyup', checkLength)
// document.querySelector('.input-container button[disabled]').addEventListener('click', ()=> alert('desativado'))
document.querySelector('.pop-up-container.list-name input').addEventListener('keyup', checkPopUpLength)


//funcoes de evento
function createListItem() {
    const nomeItem = document.getElementById('input-novo-item').value

    const novoItem =
        `<li>
        <input type="checkbox" class="list-checkbox hide" onclick="check(event)">
        <span class="span-item">${nomeItem}</span>
        <span class="span-valor"></span>
        <span class="span-quantidade"></span>
        <button class="delete-item" onclick="deleteItem(event)">Excluir</button>
        </li>`

    lista.innerHTML += novoItem

    totalItemLista === 0 ? showListNamePopUp() : totalItemLista++

    document.getElementById('input-novo-item').value = ""
    document.getElementById('bt-create-item').setAttribute('disabled', '')
}


function showListNamePopUp() {
    document.querySelector('.pop-up-container.list-name').style.display = 'initial'
}


function setListName() {
    listName = document.querySelector('.pop-up-container.list-name input').value

    document.querySelector('.texts h5').textContent = document.querySelector('.pop-up-container.list-name input').value
    document.querySelector('.pop-up-container.list-name').style.display = 'none'

    totalItemLista++
}


function deleteItem(event) {
    event.target.parentElement.style.display = 'none'
}


function saveList() {


    //add nova lista na lista de nomes do local storage
    let listasCriadas = localStorage.getItem('listasCriadas')

    //pra tirar o null se nao tiver nada na lista
    if (listasCriadas === null) listasCriadas = ''

    listasCriadas += listName + ","
    localStorage.setItem('listasCriadas', listasCriadas)


    //add elemento da lista no local storage
    localStorage.setItem(listName, document.querySelector('.div-list').innerHTML)

    alert(`Sua lista "${listName}" foi salva com sucesso!`)

    window.location.href = "http://127.0.0.1:5501/Fundamentar/99-Desafios/lista-de-compras/page2.html"
}


function deleteList() {
    window.location.reload()
}


function checkLength(event) {
    if (event.target.value.length > 2) {
        document.getElementById('bt-create-item').removeAttribute('disabled')
    } else{
        document.getElementById('bt-create-item').setAttribute('disabled', '')
    }
}

function checkPopUpLength(event){
    if (event.target.value.length > 2) {
        document.querySelector('.pop-up-container.list-name button').removeAttribute('disabled')
    } else{
        document.querySelector('.pop-up-container.list-name button').setAttribute('disabled', '')
    }
}

