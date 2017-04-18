$(document).ready(function(){
  Paloma.start();
});
var GamesController = Paloma.controller('Games', {
  index: function() {
    var game = new Phaser.Game(1270, 600, Phaser.CANVAS, 'game',);

    game.state.add("Preload", preload);
    game.state.add("theGame", theGame);
    game.state.start("Preload");
    //TODO: #1 buttons for offense
    //#2 health bars
    //#3 offensive move do dmg
    //#4 hit range and chances
    //#5 break on death
  }
});
