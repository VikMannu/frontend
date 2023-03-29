const jokelist = document.getElementById('client-list')
const getJokeButton = document.getElementById('get-clients')

function getAllClients() {
    fetch('http://127.0.0.1:8080/prueba/clientes')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const joke = data.value
            const listItem = document.createElement('li')
            listItem.innerText = joke
            jokelist.appendChild(listItem)
        })
}

getJokeButton.addEventListener('click', getAllClients)