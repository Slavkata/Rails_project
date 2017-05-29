var battle = function (game) {}

var index = 0
var player
var player_json = {}
var enemy
var enemy_json = {}
var buttons

battle.prototype = {
  create: function () {
    player = this.game.add.sprite(100, 400, 'player')
    player.anchor.set(0.5)
    player.name = "player"
    player.defense = 0
    player.focus = 0
    $.ajax({
      url: "/showStats?user=" + this.game.user + "&name=" + this.game.character,
      async: false,
      success: function (data) {
        player.maxHealth = data[0].health
        player.dmg = data[0].power
      }
    })

    $.ajax({
      url: "/getGadget?owner=" + this.game.character,
      async: false,
      success: function (data) {
        player.maxHealth += data.bonus_health
        player.dmg += data.bonus_power
      }
    })

    $.ajax({
      url: "/getUsedPotion?owner=" + this.game.character,
      async: false,
      success: function (data) {
        potions = data
      }
    })
    for (potion of potions) {
      player.dmg += potion.bonus_power
      player.health += potion.bonus_health
    }
    player.health = player.maxHealth

    enemy = this.game.add.sprite(1150, 400, 'enemy')
    enemy.anchor.set(0.5)
    enemy.name = "enemy"
    enemy.defense = 0
    enemy.focus = 0
    $.ajax({
      url: "/getBoss?name=" + this.game.enemy,
      async: false,
      success: function (data) {
        enemy.maxHealth = data.health
        enemy.dmg = data.power
      }
    })
    enemy.health = enemy.maxHealth
    enemy.scale.x *= -1
    playerBarConfig = {x: 300, y: 200}
    enemyBarConfig = {x: 1000, y: 200}
    this.playerHealth = new HealthBar(this.game, playerBarConfig)
    this.enemyHealth = new HealthBar(this.game, enemyBarConfig)
    player.addChild(this.game.add.sprite(this.circleHealth))
    enemy.addChild(this.game.add.sprite(this.squareHealth))

    if (JSON.parse(localStorage.getItem("enemy")) != null) {
      console.log(JSON.parse(localStorage.getItem("enemy")))
      enemy_json = JSON.parse(localStorage.getItem("enemy"))
      player_json = JSON.parse(localStorage.getItem("player"))
      index = localStorage.getItem("index")

      enemy.health = enemy_json.health
      enemy.focus = enemy_json.focus
      enemy.defense = enemy_json.defense

      player.health = player_json.health
      player.focus = player_json.focus
      player.defense = player_json.defense

      this.playerHealth.setPercent(player.health/player.maxHealth * 100)
      this.enemyHealth.setPercent(enemy.health/enemy.maxHealth * 100)
    }

    this.addButtons()
  },

  addButtons: function () {
    if(index == 0) {
      buttons = this.game.add.group()
      shoot = this.game.add.button(50, 550, 'shoot', function () {this.shoot(player)}, this)
      defend = this.game.add.button(100, 550, 'defend', function () {this.defend(player)}, this)
      focus = this.game.add.button(150, 550, 'focus', function () {this.focus(player)}, this)
      strike = this.game.add.button(200, 550, 'strike', function () {this.strike(player)}, this)
      buttons.addMultiple([shoot, defend, focus, strike])
    }
    else {
      this.bot()
    }
  },

  shoot: function (control) {
    buttons.destroy()
    if (index == 0) {
      opponent = enemy
      health = this.enemyHealth
      index = 1
    }
    else {
      opponent = player
      health = this.playerHealth
      index = 0
    }

    opponent.health -= (control.dmg + control.focus - opponent.defense)
    health.setPercent(opponent.health/opponent.maxHealth * 100)

    control.focus = 0
    opponent.defense = 0

    if (opponent.health <= 0) {
      this.game.winner = control.name

      health.kill()
      opponent.kill()
      this.game.state.start("EndScreen")
    }

    enemy_json.health = enemy.health
    enemy_json.focus = enemy.focus
    enemy_json.defense = enemy.defense

    player_json.health = player.health
    player_json.focus = player.focus
    player_json.defense = player.defense

    this.afterMove()
  },

  strike: function (control) {
    buttons.destroy()
    if (index == 0) {
      opponent = enemy
      health = this.enemyHealth
      index = 1
    }
    else {
      opponent = player
      health = this.playerHealth
      index = 0
    }

    if (Math.floor(Math.random() * 100) + 1 >= 75) {
      opponent.health -= 2.5*(control.dmg + control.focus - opponent.defense)
      health.setPercent(opponent.health/opponent.maxHealth * 100)
    }

    control.focus = 0
    opponent.defense = 0

    if (opponent.health <= 0) {
      this.game.winner = control.name

      health.kill()
      opponent.kill()
      this.game.state.start("EndScreen")
    }

    enemy_json.health = enemy.health
    enemy_json.focus = enemy.focus
    enemy_json.defense = enemy.defense

    player_json.health = player.health
    player_json.focus = player.focus
    player_json.defense = player.defense

    this.afterMove()
  },

  afterMove: function (control) {
    localStorage.setItem("player", JSON.stringify(player_json))
    localStorage.setItem("enemy", JSON.stringify(enemy_json))
    localStorage.setItem("index", index)

    this.addButtons()
  },

  defend: function (control) {
    buttons.destroy()
    control.defense += 20
    index = index == 0 ? 1 : 0
    enemy_json.health = enemy.health
    enemy_json.focus = enemy.focus
    enemy_json.defense = enemy.defense

    player_json.health = player.health
    player_json.focus = player.focus
    player_json.defense = player.defense
    this.afterMove()
  },

  focus: function (control) {
    buttons.destroy()
    control.focus += 15
    index = index == 0 ? 1 : 0
    enemy_json.health = enemy.health
    enemy_json.focus = enemy.focus
    enemy_json.defense = enemy.defense

    player_json.health = player.health
    player_json.focus = player.focus
    player_json.defense = player.defense
    this.afterMove()
  },

  bot: function () {
    move = Math.floor(Math.random() * 4) + 1
    console.log(move);
    switch (move) {
      case 1:
        this.shoot(enemy)
      break;
      case 2:
        this.defend(enemy)
      break;
      case 3:
        this.focus(enemy)
      break;
      case 4:
        this.strike(enemy)
      break;
    }
  }
}
