const listasCriadas = localStorage.listasCriadas.split(',')
listasCriadas.pop()

listasCriadas.forEach(lista => {
    const div = document.createElement('div')
    div.classList.add('div-list')

    div.innerHTML = localStorage.getItem(lista)

    document.querySelector('body').appendChild(div)
});