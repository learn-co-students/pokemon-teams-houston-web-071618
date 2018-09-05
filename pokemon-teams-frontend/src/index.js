const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let main = document.getElementsByTagName("main")[0]; 

fetch(TRAINERS_URL)
  .then(data => data.json())
  .then(trainersArray => displayData(trainersArray))
  
function displayData(trainersArray) {
  trainersArray.forEach(trainerObject => showTrainer(trainerObject))
  
  function showTrainer(trainerObject) {
    let trainerName = trainerObject.name
    let trainerId = trainerObject.id
    let pokemonArray = trainerObject.pokemons
    
    let pokemonHTML = parsePokemonArray(pokemonArray)
    
    let newDiv = `
    <div class="card" data-id="${trainerId}"><p>${trainerName}</p>
    <button data-trainer-id="${trainerId}">Add Pokemon</button>
    <ul>
    ${pokemonHTML}
    </ul>
    </div>`
    
    main.innerHTML += newDiv
  }
  
  function parsePokemonArray(pokemonArray) {
    let pokemonHTML = ''
    pokemonArray.forEach(pokemonObject => {
      pokemonHTML += `<li>${pokemonObject.nickname} (${pokemonObject.species}) <button class="release" data-pokemon-id="${pokemonObject.id}">Release</button></li>`
    })
    return pokemonHTML
  }
} 
 

function showPokemon(pokemonObject, e) {
  pokemonHTML = `<li>${pokemonObject.nickname} (${pokemonObject.species}) <button class="release" data-pokemon-id="${pokemonObject.id}">Release</button></li>`

  let node = e.target.parentElement.children[2].innerHTML += pokemonHTML
}

function parseClicks(e) {
  const trainerId = e.target.dataset.trainerId
  const pokemonId = e.target.dataset.pokemonId
  
  if (trainerId) {
    let pokemonCount = e.target.parentElement.children[2].childElementCount
    if (pokemonCount < 6) {
      addPokemon(trainerId, e)
    } else {
      window.alert("You can't add more than six Pokemon!")
    }
  }
  
  if (pokemonId) {
    releasePokemon(pokemonId, e)
  }
}

function releasePokemon(pokemonId, e) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE"
  }).then(data => data.json())

  e.target.parentElement.remove()
}

function addPokemon(trainerId, e) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({trainer_id: trainerId})
  })
    .then(data => data.json())
    .then(returnedPokemonObject => showPokemon(returnedPokemonObject, e))
}

main.addEventListener("click", e => parseClicks(e))



