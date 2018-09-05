const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

// DOM Elements
const mainElement = document.getElementById('main');
const body = document.getElementById('body');

// Event Listener for Delegation
body.addEventListener('click', handleClick);

// Instantiate Players
function createPlayers(player) {
  const newPlayer = new Player(player);
}

// Create Cards for Players
function displayAllPlayers() {
  mainElement.innerHTML = Player.all().map(player => player.render()).join('');
}

// Fetch Players
fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(x => x.map(createPlayers))
  .then(displayAllPlayers);

// Send Delete Request to Backend
function deletePokemonFromBackEnd(pokemonId) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE'
  });
}


// delete pokemon locally
function deletePokemon(pokemonId, playerId) {
  let player = Player.findPlayerById(playerId);
  let index = player.pokemons.findIndex(x => x.id === pokemonId);
  player.pokemons.splice(index, 1);
  deletePokemonFromBackEnd(pokemonId);
  displayAllPlayers();
}

// Send Add Pokemon Request To Backend
function addPokemon(trainerId) {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  }).then(resp => resp.json()).then(data => addPokemonLocally(data, trainerId));
}

function addPokemonLocally(data, trainerId) {
  let player = Player.findPlayerById(trainerId);
  player.pokemons.push((new Pokemon(data)));
  displayAllPlayers();
}

function handleClick(e) {
  let actionType = e.target.className;
  if (actionType === 'release') {
    let pokemonId = parseInt(e.target.dataset.pokemonId);
    let playerId = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
    deletePokemon(pokemonId, playerId);
  } else if (actionType === 'add') {
    let trainerId = parseInt(e.target.dataset.trainerId);
    addPokemon(trainerId);
  }
}