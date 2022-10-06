//importacoes
import {
    mudarListasCriadas, adicionarListaCriada, listasCriadas, deleteList
} from './geral.js'


//variaveis
let listName

// eventos
document.querySelector('.pop-up-container.list-name button').addEventListener('click', setListName)
document.getElementById('bt-save-list').addEventListener('click', redirect)
document.getElementById('input-novo-item').addEventListener('keyup', checkLengthInputIndex)
document.querySelector('.pop-up-container.list-name input').addEventListener('keyup', checkListNamePopUpLength)
document.getElementById('bt-delete-list').addEventListener('click', deleteList)
document.getElementById('bt-delete-list').addEventListener('click', ()=> location.reload())


//---------------------------------------------app-----------------------=------------------------//




function setListName() { //ao setar um nome na lista, salva no localStorage

    listName = document.querySelector('.pop-up-container.list-name input').value

    document.querySelector('h5.list-name').textContent = listName

    document.querySelector('.pop-up-container.list-name').style.display = 'none'

    localStorage.setItem(listName, document.querySelector('.div-list').innerHTML)



    //add nova lista na lista de nomes do local storage
    mudarListasCriadas(localStorage.getItem('listasCriadas'))

    //pra tirar o null se nao tiver nada na lista
    if (listasCriadas === null) mudarListasCriadas('')

    adicionarListaCriada(listName)
    localStorage.setItem('listasCriadas', listasCriadas)
}


function redirect() {
    alert(`Sua lista "${listName}" foi salva com sucesso!`)

    window.location.href = "http://127.0.0.1:5501/Fundamentar/99-Desafios/lista-de-compras/gerenciar.html"
}

function checkLengthInputIndex(event) {
    if (event.target.value.length > 2) {
        document.getElementById('bt-create-item').removeAttribute('disabled')
    } else {
        document.getElementById('bt-create-item').setAttribute('disabled', '')
    }
}

function checkListNamePopUpLength(event) {
    if (event.target.value.length > 2) {
        document.querySelector('.pop-up-container.list-name button').removeAttribute('disabled')
    } else {
        document.querySelector('.pop-up-container.list-name button').setAttribute('disabled', '')
    }
}


