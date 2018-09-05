const players = (function () {
  const state = {
    all: []
  };

  function getAllPlayersInState() {
    return state.all
  }

  function addPlayerToState(player) {
    state.all.push(player)
  }

  function findPlayerById(id) {
    return getAllPlayersInState().find(x => x.id === id);
  }

  const obj = {
    addPlayer: function (player) {
      return addPlayerToState(player);
    },
    getAllPlayers: function () {
      return getAllPlayersInState();
    },
    getPlayerById: function (id) {
      return findPlayerById(id);
    }
  };

  return obj;
})();