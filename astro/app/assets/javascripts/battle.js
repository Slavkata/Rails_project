var battle = function (game) {}

var index = 0
var player
var enemy
var buttons

battle.prototype = {
  create: function () {
    player = this.game.add.sprite(100, 400, 'player')
    player.anchor.set(0.5)
    player.name = "player"
    $.ajax({
      url: "/showStats?user=" + this.game.user + "&name=" + this.game.character,
      async: false,
      success: function (data) {
        player.maxHealth = data[0].health
        player.health = player.maxHealth
        player.dmg = data[0].power
      }
    })

    enemy = this.game.add.sprite(1150, 400, 'enemy')
    enemy.anchor.set(0.5)
    // $.ajax({
    //   url: "/getBoss?name=" + this.game.enemy,
    //   async: true,
    //   success: function (data) {
    //     enemy.maxHealth = data.health
    //     enemy.health = enemy.maxHealth
    //     enemy.dmg = data.power
    //   }
    // })
    enemy.maxHealth = 500
    enemy.health = enemy.maxHealth
    enemy.dmg = 20
    enemy.name = "enemy"
    console.log(enemy)

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
      if (player.jump_state) {
        this.fallDown(player)
      }
      else {
        buttons = this.game.add.group()
        forward = this.game.add.button(50, 550, 'button', function () {this.move("forward", player)}, this)
        backwards = this.game.add.button(100, 550, 'button', function () {this.move("backwards", player)}, this)
        up = this.game.add.button(150, 550, 'button', function () {this.jump(player)}, this)
        shoot = this.game.add.button(200, 550, 'button', function () {this.shoot(player)}, this)
        strike = this.game.add.button(250, 550, 'button', function () {this.strike(player)}, this)
        buttons.addMultiple([forward, backwards, up, shoot, strike])
      }
    }
    else {
      if (enemy.jump_state) {
        this.fallDown(enemy)
      }
      else {
        this.bot()
      }
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
    control.jump_state = 1
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
      console.log(opponent.dmg)
      health = this.playerHealth
    }

    dmg = control.dmg - Math.floor(Math.random() * 5)
    opponent.health -= dmg
    console.log(opponent.health)
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
    health.setPercent((opponent.health/opponent.maxHealth) * 100)

    if (opponent.health <= 0) {
      opponent.kill()
      health.kill()
      this.game.winner = control.name
      this.game.state.start('EndScreen')
    }

    this.addButtons()
  },

  afterMove: function (control) {
    this.addButtons()
  },

  bot: function () {
    var flag_s = 0
    if (Math.abs(player.position.x - enemy.position.x)) {
      flag_s = 1
    }

    moves_count = flag_s == 1 ? 5 : 4
    success = Math.floor(Math.random() * moves_count);
    switch (success) {
      case 1:
      this.move("forward", enemy)
      break;
      case 2:
      this.move("backwards", enemy)
      break
      case 3:
      this.jump(enemy)
      break
      case 4:
      this.shoot(enemy)
      break
      case 5:
      this.strike(enemy)
      break
    }
  },

  fallDown: function (control) {
    control.jump_state = 0
    where = {y : 400}
    tween = this.game.add.tween(control).to(where, 2000, Phaser.Easing.Out, true)
    tween.onComplete.add(function () {this.afterMove()}, this)
  }
}
