var battle = function (game) {}

var index = 0
var player
var enemy
var buttons

battle.prototype = {
  create: function () {
    player = this.game.add.sprite(100, 400, 'player')
    player.anchor.set(0.5)
    player.maxHealth = 500
    player.health = player.maxHealth
    player.name = "player"
    player.dmg = 50

    enemy = this.game.add.sprite(1150, 400, 'enemy')
    enemy.anchor.set(0.5)
    enemy.maxHealth = 500
    enemy.health = enemy.maxHealth
    enemy.name = "enemy"
    enemy.dmg = 50

    playerBarConfig = {x: 300, y: 200}
    enemyBarConfig = {x: 1000, y: 200}
    this.playerHealth = new HealthBar(this.game, playerBarConfig)
    this.enemyHealth = new HealthBar(this.game, enemyBarConfig)
    player.addChild(this.game.add.sprite(this.circleHealth))
    enemy.addChild(this.game.add.sprite(this.squareHealth))

    this.addButtons()
  },

  addButtons: function () {
    if(index == 0) {
      buttons = this.game.add.group()
      forward = this.game.add.button(50, 550, 'button', function () {this.move("forward", player)}, this)
      backwards = this.game.add.button(100, 550, 'button', function () {this.move("backwards", player)}, this)
      up = this.game.add.button(150, 550, 'button', function () {this.jump(player)}, this)
      shoot = this.game.add.button(200, 550, 'button', function () {this.shoot(player)}, this)
      strike = this.game.add.button(250, 550, 'button', function () {this.strike(player)}, this)
      buttons.addMultiple([forward, backwards, up, shoot, strike])
    }
    else {
      this.bot()
    }
  },

  move: function (command, control) {
    index = index == 0 ? 1 : 0
    buttons.destroy()
    units = command == "forward" ? 70 : -70
    where = {x : control.world.x + units}
    tween = this.game.add.tween(control).to(where, 2000, Phaser.Easing.Out, true)
    tween.onComplete.add(function () {this.afterMove()}, this)
  },

  jump: function (control) {
    buttons.destroy()
    index = index == 0 ? 1 : 0
    where = {y : control.world.y - 100}
    tween = this.game.add.tween(control).to(where, 2000, Phaser.Easing.Out, true)
    tween.onComplete.add(function () {this.afterMove()}, this)
  },

  shoot: function (control) {
    buttons.destroy()
    index = index == 0 ? 1 : 0
    if (control == player) {
      opponent = enemy
      health = this.enemyHealth
    }

    else {
      opponent = player
      health = this.playerHealth
    }

    dmg = control.dmg - Math.floor(Math.random() * 5)
    opponent.health -= dmg
    health.setPercent(opponent.health/opponent.maxHealth * 100)

    if (opponent.health <= 0) {
      opponent.kill()
      health.kill()
      this.game.winner = control.name
      this.game.state.start('EndScreen')
    }

    this.addButtons()
  },

  strike: function (control) {
    index = index == 0 ? 1 : 0
    if (control == player) {
      opponent = enemy
      if (Math.abs(control.world.x - opponent.world.x) >= 120) {
        strike = buttons.getAt(4)
        strike.inputEnabled = false
        return
      }
      buttons.destroy()
      health = this.enemyHealth
    }

    else {
      opponent = player
      health = this.playerHealth
    }

    dmg = control.dmg - Math.floor(Math.random() * 8)
    opponent.health -= dmg
    health.setPercent(opponent.health/opponent.maxHealth * 100)

    if (opponent.health <= 0) {
      opponent.kill()
      health.kill()
      this.game.winner = control.name
      this.game.state.start('EndScreen')
    }

    this.addButtons()
  },

  afterMove: function () {
    this.addButtons()
  },

  bot: function () {
    flag_s = 0
    if (enemy.world.x - player.world.x <= 120) {
      flag_s = 1
    }
    success = Math.round(Math.random() * 100)
    if (success >= 0 && success < 5) {
      this.jump(enemy)
    }
    else if (success >= 5 && success < 10) {
      this.move("forward", enemy)
    }
    else if (flag_s === 1) {
      if (success >= 10 && success < 25) {
        this.strike(enemy)
      }
    }
    else if (success >= 25 && success < 45) {
      this.move("backwards", enemy)
    }
    else {
      this.shoot(enemy)
    }
  }
}
