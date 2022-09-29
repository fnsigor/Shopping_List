/**
 * anotações
 * 
 * Criar função para zerar valor/quantidade se clicar num input já marcado
 * Adicionar data de compra quando checkbox for marcado
 * Se pá, criar um metodo de salvar lista pra usar o localStorage
 * 
 */



//APP
const lista = document.querySelector('.div-list ul')
let totalItemLista = 0
const arrayItensLista = []
let lastCheckedItem


document.getElementById('bt-create-item').addEventListener('click', createListItem)
document.querySelector('.pop-up-container.list-name button').addEventListener('click', setListName)
document.querySelector('.pop-up-container.checked button').addEventListener('click', setPurchaseData)



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

        
    
    arrayItensLista.push(nomeItem)
    lista.innerHTML += novoItem

    totalItemLista === 0 ? showListNamePopUp() : totalItemLista++

    document.getElementById('input-novo-item').value = ""

   
}


function showListNamePopUp(){
    document.querySelector('.pop-up-container.list-name').style.display = 'initial'
}


function setListName(){
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