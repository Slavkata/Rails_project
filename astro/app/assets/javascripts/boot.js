$(document).ready(function(){
  Paloma.start();
});
var GamesController = Paloma.controller('Games', {
  index: function() {
    var game = new Phaser.Game(1250, 760, Phaser.CANVAS, 'game');
    game.user = this.params.user;
    game.state.add("Preload", preload);
    game.state.add("theGame", theGame);
    game.state.add("HomeBase", homebase);
    game.state.add("Character", character);
    game.state.start("Preload");
  }
});
