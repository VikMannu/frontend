function getAllClients() {
    fetch('http://127.0.0.1:8080/prueba/clientes')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const clientesTableBody = document.querySelector('#clientes tbody')
            data.forEach(client => {
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

                clientesTableBody.appendChild(tr)
            });
        })
        .catch(error => {
            console.error(error)
        })
}

function getAllPointsManagement() {
    fetch('http://127.0.0.1:8080/prueba/administracion_puntos')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const clientesTableBody = document.querySelector('#point-usage-concept tbody')
            data.forEach(element => {
                const tr = document.createElement('tr');

                const radioButtonTd = document.createElement('td')
                radioButtonTd.style.textAlign = 'center'
                const radioButton = document.createElement('input')
                radioButton.setAttribute('type', 'radio')
                radioButton.setAttribute('name', 'point')
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
    getAllClients()
    getAllPointsManagement()
}

window.onload = getAll