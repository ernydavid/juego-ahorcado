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

  for (let i = 0; i < word.length; i++) {
    const startBtn = document.querySelector('.startBtn')
    startBtn.classList.add('hide')

    const contenedorLetra = document.createElement('div')
    const letra = document.createElement('p')

    letra.classList.add('letra')
    letra.classList.add('hide')
    contenedorLetra.classList.add('contenedorLetra')

    letra.textContent = word.charAt(i)
    contenedorLetra.appendChild(letra)

    fragment.appendChild(contenedorLetra)
    newBoard.appendChild(fragment)
  }
}

// funcion para actualizar el tablero si la letra existe
function updateBoard (letter) {
  const letters = document.querySelectorAll('.letra')

  letters.forEach((i) => {
    if (letter === i.textContent) {
      i.classList.remove('hide')
    }
  })

  // alimento el html con los cambios
  const contenedor = document.querySelector('.contenedorIntentos')
  const fragment = document.createDocumentFragment()
  const div = document.createElement('div')
  const p = document.createElement('p')

  p.textContent = historiaLetras[intentos]
  console.log(historiaLetras[intentos])
  div.appendChild(p)
  fragment.appendChild(div)

  contenedor.appendChild(fragment)
  intentos++
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
