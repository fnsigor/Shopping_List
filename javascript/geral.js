//variaveis
let lastCheckedItem
let valorListaSelecionada
let nomeListaSelecionada
let listaSelecionada
let itemPraEditar
let totalItemLista = 0
let estaNaPaginaPrincipal = location.href === 'http://127.0.0.1:5500/index.html'
let estaNaPaginaDeGerenciamento = location.href === 'http://127.0.0.1:5500/gerenciar.html'
let listasCriadas

import {
    blocoParaExcluir
} from './gerenciar.js'



//eventos em gerenciar e index
document.querySelector('.pop-up-container.checked button').addEventListener('click', setPurchaseData)//pop up pra inserir dados da compra
document.querySelector('.pop-up-container.edit button').addEventListener('click', changeItemValues)//pop up pra editar valor e quantidade

if (estaNaPaginaDeGerenciamento) {//o geral.js no index.html chama o gerenciar.js, por isso essa adicao de evento da erro
    document.querySelector('.pop-up-container.item button').addEventListener('click', setNewItem) //pop up de nome do item

}

//exportacoes
export {
    nomeListaSelecionada, valorListaSelecionada, listaSelecionada,
    mudarListaSelecionada, mudarNomeListaSelecionada, mudarHTMLValorListaSelecionada, setNewItem, check,
    deleteList, deleteItem, changeItemValues, showEditPopUp, listasCriadas, mudarListasCriadas, adicionarListaCriada
}


//---------------------------------------------app-----------------------=------------------------//

if (estaNaPaginaPrincipal) {
    valorListaSelecionada = document.querySelector('span.span-gastos')
    listaSelecionada = document.querySelector('.div-list')
    document.getElementById('bt-create-item').addEventListener('click', setNewItem)
}



function check(event) { //verifica se o checkbox está marcado ou não

    lastCheckedItem = event.target.parentElement //li

    if (event.target.getAttribute('checked') === null) {
        document.querySelector('.pop-up-container.checked').style.display = 'initial'
        event.target.setAttribute('checked', '')
        event.target.parentElement.lastElementChild.previousElementSibling.removeAttribute('disabled')

    } else {
        deletePurchaseData(event.target)
        event.target.parentElement.lastElementChild.previousElementSibling.setAttribute('disabled', '')
    }
}

//usado ao marcar a checkbox
function setPurchaseData() {

    //pega os valores como number
    const valor = Number(document.querySelector('.pop-up-container.checked input[type="text"]').value.replace(',', '.'))
    const quantidade = Number(document.querySelector('.pop-up-container.checked input[type="number"]').value)

    //coloca os valores na li
    lastCheckedItem.firstElementChild.nextElementSibling.nextElementSibling.textContent = valor
    lastCheckedItem.lastElementChild.previousElementSibling.previousElementSibling.textContent = quantidade

    //faz o calculo e coloca o valor novo no html
    valorListaSelecionada.textContent = String(valor * quantidade + Number(valorListaSelecionada.textContent.replace(',', '.'))).replace('.', ',')

    //some com o pop up de alteração de preço
    document.querySelector('.pop-up-container.checked').style.display = 'none'

    //coloca essa alteração no localStrorage
    if (estaNaPaginaPrincipal) {
        nomeListaSelecionada = document.querySelector('h5.list-name').textContent
    }

    localStorage.setItem(nomeListaSelecionada, document.querySelector('div.div-list').innerHTML)
}

//usado ao desmarcar a checkbox
function deletePurchaseData(checkbox) {

    checkbox.removeAttribute('checked')

    const valor = Number(lastCheckedItem.firstElementChild.nextElementSibling.nextElementSibling.textContent.replace(',', '.'))
    const quantidade = Number(lastCheckedItem.lastElementChild.previousElementSibling.previousElementSibling.textContent)

    valorListaSelecionada.textContent = String(Number(valorListaSelecionada.textContent.replace(',', '.')) - valor * quantidade).replace(',', '.')

    lastCheckedItem.firstElementChild.nextElementSibling.nextElementSibling.textContent = ''
    lastCheckedItem.lastElementChild.previousElementSibling.previousElementSibling.textContent = ''

    localStorage.setItem(nomeListaSelecionada, document.querySelector('.div-list').innerHTML)
}


function showEditPopUp(event) {
    document.querySelector('.pop-up-container.edit').style.display = 'block'
    itemPraEditar = event.target.parentElement
}


function changeItemValues() {

    //capturando novo valor pra somar na lista
    const novoValor = Number(document.querySelector('.pop-up-container.edit .input-valor').value.replace(',', '.'))
    const novaQuantidade = Number(document.querySelector('.pop-up-container.edit .input-quantidade').value)

    //capturando valor para subtrair
    const antigoValor = Number(itemPraEditar.firstElementChild.nextElementSibling.nextElementSibling.textContent.replace(',', '.'))
    const antigaQuantidade = Number(itemPraEditar.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent)

    //colocando novos valores na estrutura da lista
    itemPraEditar.firstElementChild.nextElementSibling.nextElementSibling.textContent = novoValor
    itemPraEditar.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent = novaQuantidade

    //trocando os valores e salvando no localStorage
    const valorAtual = Number(valorListaSelecionada.textContent)
    valorListaSelecionada.textContent = (valorAtual - antigoValor * antigaQuantidade) + novoValor * novaQuantidade

    //sumindo com o input
    document.querySelector('.pop-up-container.edit').style.display = 'none'

    if (estaNaPaginaPrincipal) {
        localStorage.setItem(document.querySelector('h5.list-name').textContent, document.querySelector('.div-list').innerHTML)
    } else {
        localStorage.setItem(nomeListaSelecionada, document.querySelector('div.div-list').innerHTML)
    }

}


function createLi(itemName) {
    return `<li>
                <input type="checkbox" class="list-checkbox">
                <span class="span-item">${itemName}</span>
                <span class="span-valor"></span>
                <span class="span-quantidade"></span>
                <button class="edit-item" disabled>Editar</button>
                <button class="delete-item">Excluir</button>
            </li>`
}


function setNewItem() {

    let nomeItem

    if (estaNaPaginaPrincipal) {
        nomeItem = document.getElementById('input-novo-item').value
    } else {
        nomeItem = document.querySelector('.pop-up-container.item input').value
    }

    listaSelecionada.lastElementChild.innerHTML += createLi(nomeItem)

    if (!!estaNaPaginaPrincipal) {
        totalItemLista === 0 ? showListNamePopUp() : totalItemLista++
    }

    if (estaNaPaginaPrincipal) {
        localStorage.setItem(document.querySelector('h5.list-name').textContent, document.querySelector('.div-list').innerHTML)
    } else {
        localStorage.setItem(nomeListaSelecionada, document.querySelector('.div-list').innerHTML)
        document.querySelector('.pop-up-container.item').style.display = 'none'
    }

    totalItemLista++

    //mesma funcao de reaplicar funcao do gerenciar.js
    document.querySelectorAll('button.delete-item').forEach(input => input.addEventListener('click', deleteItem))
    document.querySelectorAll('input[type="checkbox"').forEach(bt => bt.addEventListener('click', check))
    document.querySelectorAll('button.edit-item').forEach(bt => bt.addEventListener('click', showEditPopUp))
}


function deleteList(event) {

    if (estaNaPaginaDeGerenciamento) {
        document.querySelector('.pop-up-container.lista').style.display = 'none' //sumir o pop up da lista em si
        blocoParaExcluir.style.display = 'none' //excluir a div com nome da lista
    }


    //remove o nome da lista do array de listas
    const listasLocais = localStorage.listasCriadas.split(',').filter(item => item !== '')

    listasLocais.splice(listasLocais.indexOf(nomeListaSelecionada), 1)
    localStorage.setItem('listasCriadas', listasLocais + ",")

    //remove a lista do local storage
    if(estaNaPaginaPrincipal){
        localStorage.removeItem(document.querySelector('h5.list-name').textContent)
    } else {
        localStorage.removeItem(nomeListaSelecionada)
    }
}


//usado no botao de excluir item
function deleteItem(event) {
    event.target.parentElement.style.display = 'none'
    const liElement = event.target.parentElement

    const valor = Number(liElement.firstElementChild.nextElementSibling.nextElementSibling.textContent.replace(',', '.'))
    const quantidade = Number(liElement.lastElementChild.previousElementSibling.previousElementSibling.textContent)

    valorListaSelecionada.textContent = String(Number(valorListaSelecionada.textContent.replace(',', '.')) - valor * quantidade).replace(',', '.')

    liElement.firstElementChild.nextElementSibling.nextElementSibling.textContent = ''
    liElement.lastElementChild.previousElementSibling.textContent = ''

    if (estaNaPaginaPrincipal) {
        localStorage.setItem(document.querySelector('h5.list-name').textContent, document.querySelector('.div-list').innerHTML)
    } else {
        localStorage.setItem(nomeListaSelecionada, document.querySelector('div.div-list').innerHTML)
    }
}

function showListNamePopUp() {
    document.querySelector('.pop-up-container.list-name').style.display = 'initial'
}








//FUNCOES PRA MDUAR O VALOR DE VARIAVEIS 
function mudarNomeListaSelecionada(valor) {
    nomeListaSelecionada = valor
}

function mudarHTMLValorListaSelecionada(valor) {
    valorListaSelecionada = valor
}

function mudarListaSelecionada(valor) {
    listaSelecionada = valor
}

function mudarListasCriadas(valor) {
    listasCriadas = valor
}
function adicionarListaCriada(valor) {
    listasCriadas += valor + ","
}