/**
 * anotações
 * 
 * Criar função para zerar valor/quantidade se clicar num input já marcado
 * Adicionar data de compra quando checkbox for marcado
 * Se pá, criar um metodo de salvar lista pra usar o localStorage
 * 
 * 
 * cada lista terá seu proprio espaco em local storage
 * salvaremos o nome das listas em uma array, para na outra pagina, iterar essa array e pegar cada lista pelo seu nome
 */



//=================APP

const lista = document.querySelector('.div-list ul')
let totalItemLista = 0
let lastCheckedItem
let listName




//adicionar eventos
document.getElementById('bt-create-item').addEventListener('click', createListItem)
document.querySelector('.pop-up-container.list-name button').addEventListener('click', setListName)
document.querySelector('.pop-up-container.checked button').addEventListener('click', setPurchaseData)
document.getElementById('bt-save-list').addEventListener('click', saveList)



//funcoes de evento
function createListItem(){
    const nomeItem = document.getElementById('input-novo-item').value
    
    const novoItem = 
        `<li>
        <input type="checkbox" class="list-checkbox" onclick="showPurchaseDataPopUp(event)">
        <span class="span-item">${nomeItem}</span>
        <span class="span-valor"></span>
        <span class="span-quantidade"></span>
        <button class="delete-button" onclick="deleteItem(event)">Excluir</button>
        </li>`

    lista.innerHTML += novoItem

    totalItemLista === 0 ? showListNamePopUp() : totalItemLista++

    document.getElementById('input-novo-item').value = ""
}


function showListNamePopUp(){
    document.querySelector('.pop-up-container.list-name').style.display = 'initial'
}


function setListName(){
    listName = document.querySelector('.pop-up-container.list-name input').value

    lista.previousElementSibling.textContent = document.querySelector('.pop-up-container.list-name input').value
    document.querySelector('.pop-up-container.list-name').style.display = 'none'

    totalItemLista++
}

function deleteItem(event){
    event.target.parentElement.style.display = 'none'
}


function showPurchaseDataPopUp(event){
    document.querySelector('.pop-up-container.checked').style.display = 'initial'
    lastCheckedItem = event.target.parentElement
}


function setPurchaseData(){
    const valor = document.querySelector('.pop-up-container.checked input[type="text"]').value
    const quantidade = document.querySelector('.pop-up-container.checked input[type="number"]').value    

    lastCheckedItem.firstElementChild.nextElementSibling.nextElementSibling.textContent = valor
    lastCheckedItem.lastElementChild.previousElementSibling.textContent = quantidade

    document.querySelector('.pop-up-container.checked').style.display = 'none'
}


function saveList(){


    //add nova lista na lista de nomes do local storage
    let listasCriadas = localStorage.getItem('listasCriadas')

    //pra tirar o null se nao tiver nada na lista
    if(listasCriadas === null) listasCriadas = ''

    listasCriadas += listName+","
    localStorage.setItem('listasCriadas', listasCriadas)


    //add elemento da lista no local storage
    localStorage.setItem(listName, document.querySelector('.div-list').innerHTML)

    alert(`Sua lista "${listName}" foi salva com sucesso!`)

    window.location.href = "http://127.0.0.1:5501/Fundamentar/99-Desafios/lista-de-compras/page2.html"
}
