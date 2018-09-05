const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
// Whenever a user hits Add Pokemon and they have space on their team, they should get a new Pokemon.
// Whenever a user hits Release Pokemon on a specific Pokemon team, that specific Pokemon should be released from the team.

fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainersArray => mainApp(trainersArray))

  const mainHTML = document.querySelector('#main')

  function mainApp (trainersArray) {
    trainersArray.forEach(trainer => {
      mainHTML.innerHTML += `<div class="card" id="${trainer.id}"><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
      </ul>
    </div>`

      trainer.pokemons.forEach(pokemon => {addPokemon(pokemon, trainer.id)});

  });
}

function addPokemon (pokemon) {
  let trainerId = pokemon.trainer_id
  let trainerList = document.getElementById(`${trainerId}`).querySelector('ul')
  trainerList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

mainHTML.addEventListener('click', function (event) {

  let trainerId = event.target.dataset.trainerId
  let pokemonId = event.target.dataset.pokemonId
  // debugger
  if (trainerId) {
    console.log(`you have clicked add pokemon ${trainerId}`)
    fetchPokemon(trainerId)
  }

  else if (pokemonId) {
    let id = parseInt(pokemonId)
    let URL = `${POKEMONS_URL}/${id}`
    event.target.parentElement.remove()

    fetch(URL, {
      method : 'DELETE'
    })
  }
})


function fetchPokemon (trainerId) {
  let id = parseInt(trainerId)
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: id

      })
  })
  .then(resp => resp.json())
  .then(addPokemon)
}
