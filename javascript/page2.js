//=================APP
let lastCheckedItem
let valorListaSelecionada
let nomeListaSelecionada
let blocoParaExcluir
let listasCriadas = []

document.querySelector('.pop-up-container.checked button').addEventListener('click', setPurchaseData)


localStorage.listasCriadas.split(',').forEach(lista => {

    if (lista !== '') {
        listasCriadas.push(lista)

        const div = document.createElement('div')
        div.classList.add('blocos')
        div.textContent = lista
        div.addEventListener('click', showList)

        document.querySelector('#listas-abertas').appendChild(div)
    }
});








//cria a lista a partir dos dados do localStorage e exibe elas
function showList(event) {
    const nomeLista = event.target.textContent
    const listaLocal = localStorage.getItem(nomeLista)

    const div = document.createElement('div')
    div.classList.add('div-list')
    div.innerHTML = listaLocal

    document.querySelector('.pop-up-container.lista').append(div)

    document.querySelector('.pop-up-container.lista').style.display = 'block'

    //mostra os elementos escondidos que estao na lista
    document.querySelectorAll('.hide').forEach(element => element.classList.remove('hide'))

    valorListaSelecionada = div.firstElementChild.firstElementChild.lastElementChild
    nomeListaSelecionada = div.firstElementChild.firstElementChild.firstElementChild.textContent

    //adiciona evento ao botao de excluir lista
    document.getElementById('bt-delete-list').addEventListener('click', deleteList)
    
    //para usar na funcao de excluir lista
    blocoParaExcluir = event.target

}


//verifica se o checkbox está marcado ou não
function check(event) {

    lastCheckedItem = event.target.parentElement //li

    if (event.target.getAttribute('checked') === null) {
        document.querySelector('.pop-up-container.checked').style.display = 'initial'
        event.target.setAttribute('checked', '')

    } else {
        deletePurchaseData(event.target)
    }
}


function setPurchaseData() {

    //pega os valores como number
    const valor = Number(document.querySelector('.pop-up-container.checked input[type="text"]').value.replace(',', '.'))
    const quantidade = Number(document.querySelector('.pop-up-container.checked input[type="number"]').value)

    //coloca os valores na li
    lastCheckedItem.firstElementChild.nextElementSibling.nextElementSibling.textContent = valor
    lastCheckedItem.lastElementChild.previousElementSibling.textContent = quantidade

    //faz o calculo e coloca o valor novo no html
    valorListaSelecionada.textContent = String(valor * quantidade + Number(valorListaSelecionada.textContent.replace(',', '.'))).replace('.', ',')

    //some com o pop up de alteração de preço
    document.querySelector('.pop-up-container.checked').style.display = 'none'

    //coloca essa alteração no localStrorage
    localStorage.setItem(nomeListaSelecionada, document.querySelector('.div-list').innerHTML)
}


function subtractListValue() {

    const valor = Number(lastCheckedItem.firstElementChild.nextElementSibling.nextElementSibling.textContent.replace(',', '.'))
    const quantidade = Number(lastCheckedItem.lastElementChild.previousElementSibling.textContent)

    valorListaSelecionada.textContent = String(Number(valorListaSelecionada.textContent.replace(',', '.')) - valor * quantidade).replace(',', '.')

    lastCheckedItem.firstElementChild.nextElementSibling.nextElementSibling.textContent = ''
    lastCheckedItem.lastElementChild.previousElementSibling.textContent = ''

    localStorage.setItem(nomeListaSelecionada, document.querySelector('.div-list').innerHTML)
}


function deletePurchaseData(checkbox) {

    checkbox.removeAttribute('checked')
    subtractListValue()
}


function deleteItem(event) {
    event.target.parentElement.style.display = 'none'
    subtractListValue()
}

function deleteList(event) {

    //sumir o pop up
    document.querySelector('.pop-up-container.lista').style.display = 'none'
    blocoParaExcluir.style.display = 'none'

    //remove o nome da lista do array de listas
    listasCriadas.splice(listasCriadas.indexOf(nomeListaSelecionada), 1)
    localStorage.setItem('listasCriadas', listasCriadas +",")

    //remove a lista do local storage
    localStorage.removeItem(nomeListaSelecionada)
}



