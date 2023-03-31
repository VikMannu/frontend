function getAllClients() {
    fetch('http://127.0.0.1:8080/prueba/clientes')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const clientesTableBody = document.querySelector('#clientes tbody')
            data.forEach(client => {
                const tr = document.createElement('tr');

                const idTd = document.createElement('td');
                idTd.textContent = client.id
                tr.appendChild(idTd)

                const nameTd = document.createElement('td');
                nameTd.textContent = client.nombre
                tr.appendChild(nameTd)

                const surnameTd = document.createElement('td');
                surnameTd.textContent = client.apellido
                tr.appendChild(surnameTd)

                const emailTd = document.createElement('td');
                emailTd.textContent = client.email
                tr.appendChild(emailTd)

                const amountTd = document.createElement('td');
                const amountInput = document.createElement('input');
                amountInput.type = 'number'
                amountTd.appendChild(amountInput)
                tr.appendChild(amountTd)

                const buttonTd = document.createElement('td');
                const button = document.createElement('button')
                button.innerText = 'Cargar'
                button.classList.add('boton')
                button.addEventListener('click', function () {
                    pointLoad(client.id, amountInput.value)
                })
                buttonTd.appendChild(button)
                tr.appendChild(buttonTd)

                clientesTableBody.appendChild(tr)
            });
        })
        .catch(error => {
            console.error(error)
        })
}

function pointLoad(id, amount) {
    const data = {
        'id': id,
        'monto': amount
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('http://127.0.0.1:8080/prueba/servicio/carga-puntos', options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(error)
        })
}

window.onload = getAllClients
