class Player {
  constructor({
    id,
    name,
    pokemons = []
  } = {}) {
    this.name = name;
    this.id = id;
    this.pokemons = pokemons;
    players.addPlayer(this);
  }

  createPokemons() {
    let htmlElement = '';
    this.pokemons = this.pokemons.map(pokemon => new Pokemon(pokemon));
    this.pokemons.map(pokemon => htmlElement += pokemon.render());
    return htmlElement;
  }

  render() {
    let renderPokemon = this.pokemons.length ? this.createPokemons() : '';
    return (
      `<div class="card" data-id="${this.id}"><p>${this.name}</p>
      <button class="add" data-trainer-id="${this.id}">Add Pokemon</button>
      <ul>
        ${renderPokemon}
      </ul>
    </div>`
    );
  }

  static all() {
    return players.getAllPlayers();
  }

  static findPlayerById(id) {
    return players.getPlayerById(id);
  }
}