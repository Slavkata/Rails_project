var preload = function(game) {};

preload.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = "#ffffff"
    this.game.load.spritesheet ('house', 'assets/HomeScreen/Home.png');
    this.game.load.spritesheet ('portal', 'assets/HomeScreen/Portal.png');
  },

  create: function() {
    this.game.state.start("Character");
  }
}
