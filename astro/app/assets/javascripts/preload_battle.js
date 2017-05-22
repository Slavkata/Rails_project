var preload_battle = function (game) {};

preload_battle.prototype = {
  preload: function () {

  },

  create: function () {
    this.game.state.start("Battle");
  }
}
