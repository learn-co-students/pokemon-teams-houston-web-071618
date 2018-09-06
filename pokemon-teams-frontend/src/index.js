const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//When a user loads the page,
//they should see all trainers,
//with their current team of Pokemon.
document.addEventListener('DOMContentLoaded', fetchAndDisplayTrainers)

function fetchAndDisplayTrainers(){
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => {
    addTrainersToPage(trainers)
  })
  .then(addEventsToButtons)
}

function addTrainersToPage(trainers){
  trainers.forEach(trainer => addSingleTrainerToPage(trainer))
}

function addSingleTrainerToPage(trainer){
  mainEl = document.querySelector('main')
  mainEl.innerHTML += `
  <div class="card" data-id="${trainer.id}">
    <p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
      ${getAndDisplayTrainersPokemon(trainer)}
    </ul>
  </div>`
}

function getAndDisplayTrainersPokemon(trainer){
  return trainer.pokemons.map(function(pokemon){
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="pokemon.id">Release</button></li>`
  }).join(" ")
}

function addEventsToButtons() {
  mainEl = document.querySelector('main')
  mainEl.addEventListener('click', handleClickOfButtons)
}

function handleClickOfButtons(e) {
  if (e.target.innerText === "Add Pokemon") {
    //add pokemon to trainer
    addPokemonToTrainer(e.target.dataset.trainerId, e)
  }
  else if (e.target.innerText === "Release") {
    //delete a pokemon
    deletePokemonFromTrainer(e)
  }
}

function addPokemonToTrainer(trainerId, e){
  fetch(POKEMONS_URL,{
    method: "POST",
    headers: {
  'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: trainerId})
  })
  .then(res => res.json())
  .then(pokemon => addPokemonToTrainerCard(pokemon, trainerId, e))
}

function addPokemonToTrainerCard(pokemon, trainerId, e){
  console.log(pokemon, trainerId, e)
  e.target.parentElement.children[2].innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

function deletePokemonFromTrainer(e){
  //send a delete request to my server using fetch
  e.target.parentElement.remove
}
