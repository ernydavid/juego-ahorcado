const words = [
  'elefante',
  'murcielago',
  'tecnologia',
  'perro'
]

let historiaLetras = []
let fallos = []
let intentos = 0

// declaro el boton de inicio
const startGameBtn = document.querySelector('.startBtn')


// funcion para retornar una palabra al azar del array de palabras
function getRandomWord () {
  return words[Math.floor(Math.random() * words.length)]
}
// invoco la funcion y guardo la palabra en una constante
const word = getRandomWord()

// crear el tablero de la palabra vacia
function createBoard () {
  const newBoard = document.querySelector('.tablero')
  const fragment = document.createDocumentFragment()
  // iteramos cada letra de la palabra y creamos el tablero vacio
  for (let i = 0; i < word.length; i++) {
    const startBtn = document.querySelector('.startBtn')
    startBtn.classList.add('hide')

    const contenedorLetra = document.createElement('div')
    const letra = document.createElement('p')

    letra.classList.add('letra')
    letra.setAttribute('id', i)

    contenedorLetra.classList.add('contenedorLetra')

    letra.textContent = ''
    contenedorLetra.appendChild(letra)

    fragment.appendChild(contenedorLetra)
    newBoard.appendChild(fragment)
  }
}

// funcion para actualizar el tablero si la letra existe
function updateBoard (letter) {
  const letras = document.querySelectorAll('.letra')
  
  for (let i = 0; i < word.length; i++) {
    if(word.charAt(i) === letter) {
      letras[i].textContent = letter
    }
  }
  // alimento el html con los cambios
  const contenedor = document.querySelector('.contenedorIntentos')
  const contadorHtml = document.querySelector('.contador')
  const fragment = document.createDocumentFragment()
  const div = document.createElement('div')
  const p = document.createElement('p')

  p.classList.add('intentos')
  p.textContent = historiaLetras[intentos]
  contadorHtml.classList.add('title')
  contadorHtml.textContent = `Intentos: ${historiaLetras.length}`
  div.appendChild(p)
  fragment.appendChild(div)

  contenedor.appendChild(fragment)
  intentos++
}

//chequeamos el final del juego
function checkEndGame () {
  const letras = document.querySelectorAll('.letra')

  letras.forEach((i) => {
    if (i.classList.contains('hide')) {
      return
    } else {
      alert('Ganaste')
    }
  })
}

// funcion para validar la letra ingresada
function validateLetterInWord (letter) {
  if (word.includes(letter)) {
    historiaLetras.push(letter)
  } else {
    //todo: add body parts to screen
    historiaLetras.push(letter)
    fallos.push(letter)
    console.log(fallos)
  }
  updateBoard(letter)
}

// aqui llamo al evento click del boton empezar juego
startGameBtn.addEventListener('click', () => {
  createBoard()
})

// aqui capturo cada vez que el usuario presione una tecla
document.addEventListener('keypress', (event) => {
  validateLetterInWord(event.key)
})
