const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector("main");

fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(parsingTrainers)

function parsingTrainers(trainerData) {

    trainerData.forEach((trainer) => {
        // console.log(trainer)
        const cardTemplate = `
        <div class="card" id ="${trainer.id}" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button class= "add" data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
        </ul>
      </div>
        `
        mainDiv.innerHTML += cardTemplate
        
        const ul = document.getElementById(`${trainer.id}`).querySelector('ul')
        trainer.pokemons.forEach((pokemon) => {
        const listTemplate =  `
        <li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
        `
        ul.innerHTML += listTemplate
    })
  });

} 

mainDiv.addEventListener("click", function(event) {
    event.preventDefault;
    const addButtonIsClicked = event.target.className === 'add'
    const releaseButtonIsClicked = event.target.className === 'release'
    if (addButtonIsClicked) {
        // console.log("Added")
        // debugger
        const trainerId= parseInt(event.target.dataset.trainerId)
        fetch(POKEMONS_URL, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
          },
         body: JSON.stringify({
            "trainer_id" : trainerId
            })
        }).then(res => res.json())
          .then(updatePokemon)
    }

    if (releaseButtonIsClicked) {
        const pokemonId = parseInt(event.target.dataset.pokemonId)
        let deleteURL = POKEMONS_URL + `/${pokemonId}`
        event.target.parentElement.remove()
        fetch(deleteURL, {
            method: 'DELETE',
           })         
    }
})

function updatePokemon(pokemon) {

    if (!!pokemon.error) {
        alert("Trainer can't hold any more pokemon")
    } else {
        const ul = document.getElementById(`${pokemon.trainer_id}`).querySelector('ul')
        const listTemplate =  `
        <li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
        `
        ul.innerHTML += listTemplate
    }

}