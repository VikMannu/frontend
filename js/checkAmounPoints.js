const fondoPopup = document.querySelector('#fondo-popup');
const botonCerrar = document.querySelector('#cerrar-popup');

function cerrarPopup() {
    fondoPopup.style.display = 'none';
}
botonCerrar.addEventListener('click', cerrarPopup)

const buttonConsult = document.querySelector('#button-consult')

function consult(amount) {
    const titulo = document.querySelector('.capa-popup h2');
    const parrafo = document.querySelector('.capa-popup p');
    const data = {
        'monto': parseInt(amount)
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('http://127.0.0.1:8080/prueba/servicio/consulta-puntos', options)
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
            parrafo.innerText = `La cantidad de puntos para el monto ${data.monto} es: ${data.puntos}`
            fondoPopup.style.display = 'block';
        })
        .catch(error => {
            console.error(error)
            titulo.innerText = "Error"
            parrafo.innerText = error.message
            fondoPopup.style.display = 'block';
        })
}

buttonConsult.addEventListener('click', function () {
    const amount = document.querySelector('#amount')
    consult(amount.value)
    amount.value = ''
})