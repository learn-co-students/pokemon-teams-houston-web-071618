const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector("main");

document.addEventListener('DOMContentLoaded', fetchAndDisplayTrainers)

function fetchAndDisplayTrainers() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainers => {
            addTrainersToPage(trainers)
        })
        .then(addEventsToButtons)
}

function addTrainersToPage(trainers) {
    trainers.forEach(trainer => addSingleTrainerToPage(trainer))
}

function addSingleTrainerToPage(trainer) {
    mainEl = document.querySelector('main')
    mainEl.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
        ${getAndDisplayTrainersPokemon(trainer)}
        </ul>
  </div>
    `
}

function getAndDisplayTrainersPokemon(trainer) {
    return trainer.pokemons.map(function (pokemon) {
        return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        //this removes commas in between an array
    }).join("")
}

function addEventsToButtons() {
    mainEl = document.querySelector('main')
    mainEl.addEventListener('click', handleClickOfButtons)
}

function handleClickOfButtons(e) {
    if (e.target.innerText === "Add Pokemon") {
        //add pokemon to trainer
        addPokemonToTrainer(e.target.dataset.trainerId, e)
    } else if (e.target.innerText === "Release") {
        //delete a pokemon
        deletePokemonFromTrainer(e)
    }
}

function addPokemonToTrainer(trainerId, e) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ trainer_id: trainerId })
    })
        .then(response => response.json())
        .then(pokemon => addPokemonToTrainerCard(pokemon, trainerId, e))
}

function validateResponse(pokemon) {
    //this function is not yet working. Trying to check that the response is OK so that the pokemon can be added, otherwise it has exceeded the limit of 6 pokemons per card and should provide an alert error.
    if (Response.status === 200) {
        addPokemonToTrainerCard()
    } else {
        window.alert("Error with your pokemon request!")
    }
}

function addPokemonToTrainerCard(pokemon, trainerId, e) {

    e.target.parentElement.children[2].innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}


function deletePokemonFromTrainer(e) {
    const DELETE_POKEMON_URL = `${POKEMONS_URL}/${e.target.dataset.pokemonId}`
    //send a delete request to my server using fetch
    fetch(DELETE_POKEMON_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pokemon_id: e.target.dataset.pokemonId })
    })
        .then(response => response.json())
    e.target.parentElement.remove();
}

// fetch(TRAINERS_URL)
//     .then(res => res.json())
//     .then(parsingTrainers)

// function parsingTrainers(trainerData) {

//     trainerData.forEach((trainer) => {
//         // console.log(trainer)
//         const cardTemplate = `
//         <div class="card" id ="${trainer.id}" data-id="${trainer.id}"><p>${trainer.name}</p>
//         <button class= "add" data-trainer-id="${trainer.id}">Add Pokemon</button>
//         <ul>
//         </ul>
//       </div>
//         `
//         mainDiv.innerHTML += cardTemplate

//         const ul = document.getElementById(`${trainer.id}`).querySelector('ul')
//         trainer.pokemons.forEach((pokemon) => {
//             const listTemplate = `
//         <li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
//         `
//             ul.innerHTML += listTemplate
//         })
//     });

// }

// mainDiv.addEventListener("click", function (event) {
//     event.preventDefault;
//     const addButtonIsClicked = event.target.className === 'add'
//     const releaseButtonIsClicked = event.target.className === 'release'
//     if (addButtonIsClicked) {
//         const trainerId = parseInt(event.target.dataset.trainerId)
//         fetch(POKEMONS_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 "trainer_id": trainerId
//             })
//         }).then(res => res.json())
//             .then(updatePokemon)
//     }

//     if (releaseButtonIsClicked) {
//         const pokemonId = parseInt(event.target.dataset.pokemonId)
//         let deleteURL = POKEMONS_URL + `/${pokemonId}`
//         event.target.parentElement.remove()
//         fetch(deleteURL, {
//             method: 'DELETE',
//         })
//     }
// })

// function updatePokemon(pokemon) {

//     if (!!pokemon.error) {
//         alert("Trainer can't hold any more pokemon")
//     } else {
//         const ul = document.getElementById(`${pokemon.trainer_id}`).querySelector('ul')
//         const listTemplate = `
//         <li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
//         `
//         ul.innerHTML += listTemplate
//     }

// }