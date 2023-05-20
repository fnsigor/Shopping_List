//importacoes
import {
    deleteList, mudarListaSelecionada, mudarNomeListaSelecionada,
    mudarHTMLValorListaSelecionada, setNewItem, check, deleteItem, showEditPopUp
} from './geral.js'


//variaveis
let blocoParaExcluir

export { blocoParaExcluir }


//---------------------------------------------app-----------------------=------------------------//


//pra capturar listas no localStorage
try {
    localStorage.listasCriadas.split(',').forEach(lista => {

        if (lista !== '') {

            const div = document.createElement('div')
            div.classList.add('blocos')
            div.textContent = lista
            div.addEventListener('click', showList)

            document.querySelector('#listas-abertas').appendChild(div)
        }
    })
} catch (e) { }

function showPopUpAddItem() {
    document.querySelector('.pop-up-container.item').style.display = 'block'
}

//cria a lista a partir dos dados do localStorage e exibe elas
function showList(event) {
    try{ //colocar na funcao delete list
        document.querySelector('.pop-up-container.lista').removeChild(document.querySelector('.pop-up-container.lista div.div-list'));
    } catch(e){}

    const nomeLista = event.target.textContent
    const listaLocal = localStorage.getItem(nomeLista)

    const div = document.createElement('div')
    div.classList.add('div-list')
    div.innerHTML = listaLocal

    document.querySelector('.pop-up-container.lista').append(div)

    document.querySelector('.pop-up-container.lista').style.display = 'flex'

    //valorListaSelecionada = 
    mudarHTMLValorListaSelecionada(div.firstElementChild.firstElementChild.lastElementChild)

    //nomeListaSelecionada = 
    mudarNomeListaSelecionada(div.firstElementChild.firstElementChild.firstElementChild.textContent)

    //listaSelecionada =
    mudarListaSelecionada(div)

    //para usar na funcao de excluir lista
    blocoParaExcluir = event.target

    document.getElementById('bt-delete-list').removeAttribute('disabled')
    document.getElementById('bt-save-list').removeAttribute('disabled')

    //adiciona evento ao botao de excluir lista
    document.getElementById('bt-delete-list').addEventListener('click', deleteList)

    //muda funcao de salvar lista pra funcao de add item
    document.getElementById('bt-save-list').textContent = "Adicionar Item"
    document.getElementById('bt-save-list').onclick = showPopUpAddItem


    reaplicarFuncoes()
}


//mudar essa funcao para o geral depois
function reaplicarFuncoes() {
    //checkbox
    document.querySelectorAll('input[type="checkbox"').forEach(input => input.addEventListener('click', check))

    //deletar elemento
    document.querySelectorAll('button.delete-item').forEach(bt => bt.addEventListener('click', deleteItem))

    //editar 
    document.querySelectorAll('button.edit-item').forEach(bt => bt.addEventListener('click', showEditPopUp))
}
