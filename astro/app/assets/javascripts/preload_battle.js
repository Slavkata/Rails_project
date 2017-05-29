var preload_battle = function (game) {};

preload_battle.prototype = {
  preload: function () {
    this.game.load.spritesheet('enemy', 'assets/Portal/Bosses/' + this.game.enemy + '.png')
    this.game.load.spritesheet('shoot', 'assets/Battle/shoot.png')
    this.game.load.spritesheet('strike', 'assets/Battle/strike.png')
    this.game.load.spritesheet('defend', 'assets/Battle/defend.png')
    this.game.load.spritesheet('focus', 'assets/Battle/focus.png')
    this.game.load.spritesheet('player', 'assets/Battle/player.png')
  },

  create: function () {
    this.game.state.start("Battle");
  }
}
