class Pokemon {
  constructor({
    id,
    nickname,
    species,
    trainer_id
  } = {}) {
    this.id = id;
    this.nickname = nickname;
    this.species = species;
    this.trainer_id = trainer_id;
  }

  render() {
    return (
      `<li>${this.nickname} (${this.species}) <button class="release" data-pokemon-id="${this.id}">Release</button></li>`
    );
  }
}