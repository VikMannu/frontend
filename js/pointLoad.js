
const fondoPopup = document.querySelector('#fondo-popup');
const botonCerrar = document.querySelector('#cerrar-popup');

function cerrarPopup() {
    fondoPopup.style.display = 'none';
}

botonCerrar.addEventListener('click', cerrarPopup);

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
    const titulo = document.querySelector('.capa-popup h2');
    const parrafo = document.querySelector('.capa-popup p');
    const data = {
        'id': id,
        'monto': parseInt(amount)
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('http://127.0.0.1:8080/prueba/servicio/carga-puntos', options)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Ocurrió un error al hacer la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            titulo.innerText = "Exito"
            parrafo.innerText = data.message
            fondoPopup.style.display = 'block';
        })
        .catch(error => {
            console.error(error)
            titulo.innerText = "Error"
            parrafo.innerText = error.message
            fondoPopup.style.display = 'block';
        })
}

window.onload = getAllClients
