const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function makeRequest(url, passMethod) {
	return fetch(url, {

	}, {method: passMethod})
		.then(resp => resp.json())
		.then(putTrainersOnPage)
}

makeRequest(TRAINERS_URL, "get")

function putTrainersOnPage(trainers) {
	const trainersDiv = document.getElementsByTagName("main")[0];
	trainers.forEach(function(trainer) {
	trainersDiv.innerHTML += `
		<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
		<button class="addPokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
		<ul>
		${putPokemonOnTrainer(trainer).join(" ")}
		</ul>
		</div>
		`
	})
}

function putPokemonOnTrainer(trainer) {
	return trainer.pokemons.map(function(pokemon) {
		return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" 
		data-pokemon-id="${pokemon.id}">Release</button></li>
		`
	})
}

	const trainersDiv = document.getElementsByTagName("main")[0];

	trainersDiv.addEventListener('click', function(event) {
		const pokemonAdded = event.target.className === "addPokemon"

		if (pokemonAdded) {
			addPokemonToTeam(event.target.dataset.trainerId, event);
		}
	})

	trainersDiv.addEventListener('click', function(event) {
		const pokemonRemoved = event.target.className === 'release'
		if (pokemonRemoved) {
			event.target.parentElement.remove()
			fetch(POKEMONS_URL+`/${event.target.dataset.pokemonId}`, {
				method: "delete"
			})
		}
	})

function addPokemonToTeam(trainerId, event) {
	if (event.target.parentElement.children[2].childElementCount < 6) {
	return fetch(POKEMONS_URL, {
		method: "post",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify( {
			"trainer_id": trainerId
		})
	}).then(resp => resp.json())
		.then(resp => addPokemon(resp))

		function addPokemon(pokemon) {
	event.target.parentElement.children[2].innerHTML += `
	<li>${pokemon.nickname} (${pokemon.species}) <button class="release" 
		data-pokemon-id="${pokemon.id}">Release</button></li>
	`
	}
}
}

