var endscreen = function (game) {}

endscreen.prototype = {
  create: function () {
    style = { font: "65px Arial", fill: "#ff0044", align: "center" }
    if (this.game.winner == "player") {
      this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Victory", style).anchor.set(0.5)
    }
    else {
      this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Defeat", style).anchor.set(0.5)
    }

    this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100, this.continue, this)
  },

  continue: function () {
    window.location.href = "localhost:3000/game"
  }
}