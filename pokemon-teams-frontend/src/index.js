const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const appContainer = document.querySelector("main");

const getTrainer = () => {
  return fetch(TRAINERS_URL).then(res => res.json());
};

getTrainer().then(json => {
  console.log(json);
  json.forEach(trainer => {
    //creating elements and attributes
    const trainerCard = document.createElement("div");
    trainerCard.setAttribute("class", "card");

    trainerCard.dataset.id = trainer.id;

    trainerCard.innerHTML = renderCard(trainer);
    trainerCard.addEventListener("click", handleButton);

    appContainer.append(trainerCard);
  });
});

const createPokemon = trainerId => {
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  });
};

const releasePokemon = pokemon_Id => {
  return fetch(`${POKEMONS_URL}/${pokemon_Id}`, {
    method: "DELETE"
  }).then(res => res.json);
};

function renderCard(trainer) {
  return `
    <p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
    ${trainer.pokemons
      .map(pokemon => {
        return ` 
          <li>
            ${pokemon.nickname} (${pokemon.species})
            <button class="release" data-pokemon-id="${pokemon.id}">
            Release
            </button>
          </li>`;
      })
      .join("")}
    </ul>`;
}

function handleButton(event) {
  console.log(event);

  if (event.target.tagName === "BUTTON") {
    switch (event.target.innerText) {
      case "Add Pokemon":
        const trainer_id = event.target.dataset.trainerId;

        createPokemon(parseInt(trainer_id))
          .then(res => res.json())
          .then(newPokemon => {
            if (!newPokemon.error) {
              const trainerCard = document.querySelector(
                `div[data-id='${trainer_id}']`
              );

              let pokemonList = trainerCard.querySelector("ul");
              pokemonList.innerHTML += `
              <li>${newPokemon.nickname} (${newPokemon.species})
              <button class="release" data-pokemon-id="${newPokemon.id}">
                Release
              </button>
              `;
            }
          });

        break;
      case "Release":
        // const trainer_id = event.target.dataset.trainerId;
        const pokemon_id = event.target.dataset.pokemonId;
        releasePokemon(pokemon_id);
        event.target.parentElement.remove();
        // const selectedPokemon = document.querySelector()
        break;
    }
  }
}
