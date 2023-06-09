const fondoPopup = document.querySelector('#fondo-popup');
const botonCerrar = document.querySelector('#cerrar-popup');
const listClients = []

function cerrarPopup() {
    fondoPopup.style.display = 'none';
    location.reload()
}
botonCerrar.addEventListener('click', cerrarPopup)

const loadButton = document.querySelector('#load')
loadButton.addEventListener('click', function () {
    const selectedClient = document.querySelector('input[name="client"]:checked')
    const selectedPointManagement = document.querySelector('input[name="point-management"]:checked')
    if (selectedClient && selectedPointManagement) {
        const idClient = selectedClient.value;
        const idPointManagement = selectedPointManagement.value;
        pointLoadUsage(idClient, idPointManagement)
    } else {
        console.log('Debes seleccionar un cliente');
    }
});

function pointLoadUsage(idClient, idPointManagement) {
    const titulo = document.querySelector('.capa-popup h2');
    const parrafo = document.querySelector('.capa-popup p');
    const data = {
        "idCliente": parseInt(idClient),
        "idConcepto": parseInt(idPointManagement)
    }
    console.log(data)
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('http://127.0.0.1:8080/prueba/servicio/uso-puntos', options)
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

function getAllClients() {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8080/prueba/clientes')
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Ocurrió un error al hacer la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                reject(error)
            })
    })
}

function getPointsClient(idClient) {
    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8080/prueba/clientes/puntos-cliente/${idClient}`)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Ocurrió un error al hacer la solicitud');
                }
                return response.json();
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                reject(error)
            })
    })
}

async function loadClients() {
    const clients = await getAllClients()
    const clientesTableBody = document.querySelector('#clientes tbody')
    clients.forEach(async client => {
        console.log(client)
        const tr = document.createElement('tr');

        const radioButtonTd = document.createElement('td')
        radioButtonTd.style.textAlign = 'center'
        const radioButton = document.createElement('input')
        radioButton.setAttribute('type', 'radio')
        radioButton.setAttribute('name', 'client')
        radioButton.setAttribute('value', client.id)
        radioButton.classList.add('centrado')
        radioButtonTd.appendChild(radioButton)
        tr.appendChild(radioButtonTd)

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

        const pointsTd = document.createElement('td')
        try {
            const points = await getPointsClient(client.id)
            pointsTd.textContent = points.puntos
        } catch (error) {
            pointsTd.textContent = "0"
        }
        tr.appendChild(pointsTd)

        clientesTableBody.appendChild(tr)
    });
}

function getAllPointsManagement() {
    fetch('http://127.0.0.1:8080/prueba/administracion_puntos')
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Ocurrió un error al hacer la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            const clientesTableBody = document.querySelector('#point-usage-concept tbody')
            data.forEach(element => {
                const tr = document.createElement('tr');

                const radioButtonTd = document.createElement('td')
                radioButtonTd.style.textAlign = 'center'
                const radioButton = document.createElement('input')
                radioButton.setAttribute('type', 'radio')
                radioButton.setAttribute('name', 'point-management')
                radioButton.setAttribute('value', element.id)
                radioButton.classList.add('centrado')
                radioButtonTd.appendChild(radioButton)
                tr.appendChild(radioButtonTd)

                const idTd = document.createElement('td');
                idTd.textContent = element.id
                tr.appendChild(idTd)

                const descriptionTd = document.createElement('td');
                descriptionTd.textContent = element.descripcionConcepto
                tr.appendChild(descriptionTd)

                const pointTd = document.createElement('td');
                pointTd.textContent = element.puntosRequeridos
                tr.appendChild(pointTd)

                clientesTableBody.appendChild(tr)
            });
        })
        .catch(error => {
            console.error(error)
        })
}

function getAll() {
    loadClients()
    getAllPointsManagement()
}

window.onload = getAll