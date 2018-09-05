const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')

// - When a user loads the page, they should see all
//   trainers, with their current team of Pokemon.
// - Whenever a user hits `Add Pokemon` and they have
//   space on their team, they should get a new Pokemon.
// - Whenever a user hits `Release Pokemon` on a specific
//   Pokemon team, that specific Pokemon should be released from
//   the team.

fetch(TRAINERS_URL)
	.then(resp => resp.json())
	.then(putTrainersOnPage)
// need to interpolate pokemon string inside the ul
// use single backticks in string interpolation
mainDiv.addEventListener('click', event => {
	if (event.target.dataset.trainerId !== undefined) {
		fetch(POKEMONS_URL, {
    	method: 'POST',
    	headers: {
      	'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({
  			trainer_id: event.target.dataset.trainerId
		})
  	})
    .then(resp => resp.json())
    .then(addPokemon)
	}

	if (event.target.dataset.pokemonId !== undefined) {
		event.target.parentElement.remove()
		fetch(POKEMONS_URL + '/' + event.target.dataset.pokemonId, {
      		method: "DELETE"
      	})
	}
})

function putTrainersOnPage(trainers) {
	
	trainers.forEach(trainer => {
		let pokemonString = ""
		trainer.pokemons.forEach(pokemon => {
			pokemonString += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
		})
		mainDiv.innerHTML += `
			<div class="card" data-id="${trainer.id}"><p>"${trainer.name}"</p>
  				<button data-trainer-id="${trainer.id}">Add Pokemon</button>
  				<ul>
				    ${pokemonString}
  				</ul>
			</div>
		`
	})
}

function addPokemon(pokemon) {
	mainDiv.children[pokemon.trainer_id-1].lastElementChild.innerHTML += `
		<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
	` 
}


