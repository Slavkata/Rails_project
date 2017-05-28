$(document).ready(function () {
  Paloma.start();
})
var BattleController = Paloma.controller('Battles', {
  index: function () {
    var game = new Phaser.Game(1250, 600, Phaser.CANVAS, 'battle')

    game.user = this.params.user;
    game.enemy = this.params.enemy;
    game.character = this.params.character;
    game.state.add("Preload", preload_battle);
    game.state.add("Battle", battle);
    game.state.add("EndScreen", endscreen);
    game.state.start("Preload");
  }
})
