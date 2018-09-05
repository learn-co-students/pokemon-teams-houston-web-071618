const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')


// function makeRequest(){
// fetch(TRAINERS_URL, {

// }, {method: "GET"})
// .then(resp => resp.json())
// .then(console.log())


// }


// function makeRequest() {
//   return fetch(toyUrl, {

//   }, {method: "GET"})
//     .then(resp => resp.json())
// }


function init(){
	makeRequest(TRAINERS_URL, 'GET')
}


function getrandomPokemon(trainerid, event){
	//debugger

	let insertarget = event.target.parentElement.children[2]

	if(insertarget.childElementCount < 6){
		return fetch(POKEMONS_URL, {
			method: "POST",
			body: JSON.stringify({
				trainer_id: trainerid
			}),
			headers: {
	  			'Content-Type': 'application/json'
			}

		}).then(resp => resp.json())
		.then(resp => addPokemon(resp))
	}
	else{
		window.alert("Too many!!")
	}

	function addPokemon(blah){
		//debugger
		//debugger

		
		//debugger

		
			event.target.parentElement.children[2].innerHTML += `<li>${blah.nickname} (${blah.species}) <button class="release" data-pokemon-id=${blah.id}>Release</button></li>`
		

	}

}

function makeRequest(URL, passmethod) {
  return fetch(URL, {

  }, {method: passmethod})
    .then(resp => resp.json())
   	.then(putTrainersOnPage)
}



// debugger

function trainerstoarray(trainers){
trainers.forEach(function(trainer){
	console.log(trainer)
})
}

function putTrainersOnPage(trainers){
	//debugger

	// debugger
	trainers.forEach(function(trainer){
		//debugger
		main.innerHTML += `
		<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
		  <button class="addpoke" data-trainer-id=${trainer.id}>Add Pokemon</button>
		  <ul>
			${addPokemonstoTrainer(trainer).join('')}
		  </ul>
		</div>
		`

		
	})
}

main.addEventListener('click', function(event){
	//console.log("adasd")

	const releasePokemon = event.target.className === 'release'
	const addPokemon = event.target.className === 'addpoke'

	if(addPokemon){
		getrandomPokemon(event.target.dataset.trainerId, event)
		//event.target.parentElement
		//debugger
		
	}

	if(releasePokemon){
		//debugger
		event.target.parentElement.remove()
		fetch(POKEMONS_URL+`/${event.target.dataset.pokemonId}`, {
			method: "DELETE"
		})
	}
})




function addPokemonstoTrainer(trainer){
	//debugger
	return trainer.pokemons.map(function(pokemon){
		return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
	})
}


// //.forEach(function(pokemon){
// 				//debugger
// 				return pokemon.valueOf()
// 			})

init()