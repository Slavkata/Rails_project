var preload = function(game) {};

preload.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#ffffff"
    this.game.load.spritesheet ('house', 'assets/Game/circle1.png', 140, 140);
    this.game.load.spritesheet ('portal', 'assets/Game/square1.png', 140, 140);
    this.game.load.spritesheet ('shop', 'assets/Game/Right.png', 140, 100);
    this.game.load.spritesheet ('arena', 'assets/Game/Refresh.png', 140, 140);
  },

  create: function() {
    this.game.state.start("Character");
  }
}
