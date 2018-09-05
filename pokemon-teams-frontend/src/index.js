const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

  const cardAddMain = document.querySelector('#main');

// When a user loads the page, they should see all
//  trainers, with their current team of Pokemon.
document.addEventListener('DOMContentLoaded', () =>{
});

  fetch(TRAINERS_URL)
    .then(trainers => trainers.json())
    .then(trainers => createCards(trainers))

// fetch and render pokemons
function getPokemonTeams(){
  let promise = fetch(TRAINERS_URL)
  let anotherPromise = promise.then(function(response){
     return response.json()
   })
  anotherPromise.then(function(trainers){
    trainers.forEach(trainer => {
      createCards(trainer)
    })
  })
}

function createCards(trainers){


  trainers.forEach((trainer) => {
    cardAddMain.innerHTML +=
    `<div class="card" id=${trainer.id}><p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul>
      </ul>
      </div>`
      trainer.pokemons.forEach(pokemon => {
        addPokemon(pokemon)
      })
  })


}

function addPokemon(pokemon){
  let list = document.getElementById(`${pokemon.trainer_id}`).querySelector('ul')
  list.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
}

cardAddMain.addEventListener('click', function (event) {
  let trainerId = event.target.dataset.trainerId
  let pokemonId = event.target.dataset.pokemonId

  if (trainerId) {
    let id = parseInt(trainerId)
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    },
      body: JSON.stringify({
        trainer_id: id
      })
    })
    .then(resp => resp.json())
    .then(addPokemon)
  }

  else if (pokemonId) {
    event.target.parentElement.remove()
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
      method: 'DELETE'
    })
  }
})



// Whenever a user hits `Add Pokemon` and they have
//   space on their team, they should get a new Pokemon.

// - Whenever a user hits `Release Pokemon` on a specific
//   Pokemon team, that specific Pokemon should be released from
//   the team.
