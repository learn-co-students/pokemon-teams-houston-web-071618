const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainersMain = document.getElementById('trainers')

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
const parseJSON = resp => resp.json()

fetch(TRAINERS_URL)
  .then(parseJSON)
  .then(putTrainersOnPage)

function putTrainersOnPage(trainers) {
    const trainerCollectionDiv = document.getElementById('trainers')
	trainers.forEach(function(trainer) {
		trainerCollectionDiv.innerHTML += `
            <div class="card" id="${trainer.id}">
            <h2>${trainer.name}</h2>
            <button class="addPoke" data-trainer-id="${trainer.id}">Add Pokemon</button><ul>
            ${addPokemonToAvoidAggrevation(trainer.pokemons)}
            </ul></div>`

    })
}

function addPokemonToAvoidAggrevation(pokemons) {
   let x = pokemons.map(function(pokemon){
        return `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    })
    // console.log(x.join(""))
    return x.join("")
}

// Whenever a user hits 'Release Pokemon' on a specific Pokemon team, that specific Pokemon should be released from the team.
trainersMain.addEventListener('click', function(event) {
    const releaseBtnIsClicked = event.target.className === 'release'
    
    if (releaseBtnIsClicked) {
        event.target.parentElement.remove()

        const pokemonID = event.target.dataset.pokemonId
        const newPOKEMONS_URL = POKEMONS_URL + `/${pokemonID}`
        fetch(newPOKEMONS_URL, {
            method: 'DELETE'
        })
    }
})


// Whenever a user hits 'Add Pokemon' and they have space on their team, they should get a new Pokemon.
function addPokemon(trainerID) {
    
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        trainer_id: trainerID
        })
    })
    .then(res => res.json()) 
    .then(displayPokemon)
    
}


function displayPokemon(pokemonObj) {
    console.log(pokemonObj)
    // debugger
    const node = document.getElementById(`${pokemonObj.trainer_id}`).getElementsByTagName("ul")[0]
    let newPokemon = `
    <li>${pokemonObj.nickname} (${pokemonObj.species})<button class="release" data-pokemon-id="${pokemonObj.id}">Release</button></li>
    `
    node.innerHTML += newPokemon
}

trainersMain.addEventListener('click', function(event) {
    // const addPokeIsClicked = event.target.className === 'addPoke'
    // debugger
    const trainerID = event.target.dataset.trainerId
    if(trainerID) {
        // debugger
      addPokemon(trainerID)
    }
})


