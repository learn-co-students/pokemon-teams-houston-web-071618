const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainSection = document.querySelector('main')

document.addEventListener('DOMContentLoaded', getEverything)

function getEverything() {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainerObjects => renderTrainers(trainerObjects))
    .then(addAllEventListenersToPage)
}

function renderTrainers(trainers) {
  trainers.forEach(trainer => addSingleTrainerToPage(trainer))
}

function addSingleTrainerToPage(trainerObj) {
  mainSection.innerHTML += `
  <div class="card" data-id=${trainerObj.id}>
    <p>${trainerObj.name}</p>
    <button data-trainer-id=${trainerObj.id}>Add Pokemon</button>
    <ul>
      ${getTrainersPokemonAndDisplayOnPage(trainerObj.pokemons)}
    </ul>
  </div>
  `
}

function getTrainersPokemonAndDisplayOnPage(pokemonsArr) {
  // console.log(pokemonsArr)
  // for each pokemon in the array we want to create a list item
  const newArr = pokemonsArr.map(pokemon => {
    return `
    <li>
      ${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id=${pokemon.id}>
        Release
      </button>
    </li>
    `
  })
  return newArr.join('')
}

function addAllEventListenersToPage() {
  mainSection.addEventListener('click', (e) => {
    if (e.target.innerText === 'Add Pokemon') {
      getAndAddPokemonToPage(e.target.dataset.trainerId, e)
    }
    if (e.target.innerText === 'Release') {
      releasePokemon(e.target.dataset.pokemonId)
    }
  })
}

function getAndAddPokemonToPage(trainerId, e) {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      trainer_id: `${trainerId}`
    })
  })
    .then(resp => resp.json())
    .then(pokemonObj => addSinglePokemon(pokemonObj, e))
}

function addSinglePokemon(pokemonObj, e) {
  const trainersPokemonUl = e.target.parentElement.querySelector('ul')

  trainersPokemonUl.innerHTML += `
  <li>
    ${pokemonObj.nickname} (${pokemonObj.species})
    <button class="release" data-pokemon-id=${pokemonObj.id}>
      Release
    </button>
  </li>
  `
}

function releasePokemon(pokemonId) {
  fetch(POKEMONS_URL + '/' + pokemonId, {
    method: 'DELETE'
  })
    .then(e.target.parentElement.remove())
}


















// document.addEventListener('DOMContentLoaded', getAndDisplayTrainers)
//
// function getAndDisplayTrainers() {
//   fetch(TRAINERS_URL)
//   .then(resp => resp.json())
//   .then(trainerObjects => renderTrainers(trainerObjects))
//   .then(addEventsToButtons)
// }
//
// function renderTrainers(trainerObjects) {
//   trainerObjects.forEach(trainer => addTrainerToPage(trainer))
// }
//
// function addTrainerToPage(trainerObj) {
//   const main = document.querySelector('main')
//
//   main.innerHTML += `
//   <div class="card" data-id=${trainerObj.id}><p>${trainerObj.name}</p>
//     <button data-trainer-id=${trainerObj.id}>Add Pokemon</button>
//     <ul>
//       ${getAndDisplayTrainersPokemon(trainerObj.pokemons)}
//     </ul>
//   </div>
//   `
// }
//
// function getAndDisplayTrainersPokemon(pokemonArr) {
//   return pokemonArr.map(pokemon => {
//     return `<li id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
//   }).join("")
// }
//
// function addEventsToButtons() {
//   mainEl = document.querySelector('main')
//   mainEl.addEventListener('click', handleClick)
// }
//
// function handleClick(e) {
//   if (e.target.innerText === 'Add Pokemon') {
//     addPokemonToTrainer(e.target.dataset.trainerId)
//   }
//   if (e.target.innerText === 'Release') {
//     releasePokemon(e.target.dataset.pokemonId)
//   }
// }
//
// function addPokemonToTrainer(trainerId) {
//   trainerCards = document.querySelectorAll('.card')
//   trainerCards.forEach(trainerCard => {
//     if (trainerCard.dataset.id == trainerId) {
//       fetch(POKEMONS_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({trainer_id: trainerId})
//       })
//       .then(resp => resp.json())
//       .then(pokemonObj => {
//         trainerCard.querySelector('ul').innerHTML += `
//         <li>${pokemonObj.nickname} (${pokemonObj.species}) <button class="release" data-pokemon-id=${pokemonObj.id}>Release</button></li>
//         `
//       })
//     }
//   })
// }
//
// function releasePokemon(pokemonId) {
//   console.log(pokemonId)
//   fetch(`${POKEMONS_URL}/${pokemonId}`, {method: 'DELETE'})
//     .then(() => {
//       selectedPokemon = document.getElementById(`${pokemonId}`)
//       selectedPokemon.remove()
//     })
// }
