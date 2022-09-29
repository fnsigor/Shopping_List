const lista = document.querySelector('.div-list ul')
let totalItemLista = 0
const arrayItensLista = []


document.getElementById('bt-create-item').addEventListener('click', createListItem)
document.querySelector('.pop-up-container.list-name button').addEventListener('click', setListName)



function createListItem(){
    const nomeItem = document.getElementById('input-novo-item').value
    
    const novoItem = 
        `<li>
        <input type="checkbox" class="list-checkbox">
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
