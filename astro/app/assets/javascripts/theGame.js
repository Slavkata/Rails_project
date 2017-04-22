var theGame = function(game) {};

var index;
var circle_jump;
var circle_duck;
var circle_forward;
var circle_backwards;

var circle;
var square;
var reset;
var tween;

var offense_low;
var offense_medium;
var offense_high;

var circle_health = 500;
var square_health = 500;

  theGame.prototype = {

    create: function() {
      square = this.game.add.sprite(1100, 400, 'square');
      circle = this.game.add.sprite(100, 400, 'circle');

      var circleBarConfig = {x: 300, y: 200};
      var squareBarConfig = {x: 1000, y: 200};
      this.circleHealth = new HealthBar(this.game, circleBarConfig);
      this.squareHealth = new HealthBar(this.game, squareBarConfig);

      circle.addChild(this.game.add.sprite(this.circleHealth));
      square.addChild(this.game.add.sprite(this.squareHealth));

      reset = this.game.add.button(600, 100, 'square', function() {
        this.setposdata({
          circle_x_pos: 100,
          circle_y_pos: 400,
          square_x_pos: 1100,
          square_y_pos: 400,
          index : 0
        });
        circle.x = 100;
        circle.y = 400;
        square.x = 1100;
        square.y = 400;
        index = 0;
        this.circleHealth.setPercent(100);
        this.squareHealth.setPercent(100);
      }, this);

      $.ajax({url : "/getposdata", async: false, success: function(data) {
        square.x = data.square_x_pos;
        square.y = data.square_y_pos;
        circle.x = data.circle_x_pos;
        circle.y = data.circle_y_pos;
        index = data.index;
      }});

      this.addButtons();
    },


    addButtons: function() {
      if (index == 0) {
      /*  circle_jump = this.game.add.button(50, 580, 'square', function() {
                  this.circle_move({ y: circle.world.y + 30 });
                  }, this);
        circle_duck = this.game.add.button(200, 580, 'square', function() {
                  this.circle_move({ y: circle.world.y - 100 });
                }, this);*/
        circle_backwards = this.game.add.button(500, 580, 'square', function() {
                  this.circle_move({ x: circle.world.x + 100 });
                  }, this);
        circle_forward = this.game.add.button(350, 580, 'square', function() {
                  this.circle_move({ x: circle.world.x - 100 });
                  }, this);
        offense_high = this.game.add.button(50, 580, 'square', function() {
                  this.circle_attack("high");
        }, this);
        offense_medium = this.game.add.button(200, 580, 'square', function() {
                  this.circle_attack("medium");
        }, this);
        offense_low = this.game.add.button(200, 580, 'square', function() {
                  this.circle_attack("low");
        }, this);
      }
      else if (index == 1){
        if (circle_jump != undefined) {
          this.destroyCircle();
        }
        var move = Math.floor((Math.random() * 2) + 1);
        move = move.toString();
        var moves = {
          "1" : { x: square.world.x + 100 },
          "2" : { x: square.world.x - 100 },
          "3" : { y: square.world.y + 30 },
          "4" : { y: square.world.y - 100 }
        };
        this.square_move(moves[move], move);
      }
    },

    circle_move: function (where, move) {
      this.destroyCircle();
      index = 1;
      tween = this.game.add.tween(circle).to(where, 2000, Phaser.Easing.Out, true);
      tween.onComplete.add(function() {
          this.setposdata({ circle_x_pos : circle.world.x, circle_y_pos : circle.world.y,
                            square_x_pos : square.world.x, square_y_pos : square.world.y,
                            index: index});
          this.addButtons();
        }, this);
    },

    square_move: function(where) {
      index = 0;
      tween = this.game.add.tween(square).to( where, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add(function() {
        this.setposdata({ circle_x_pos : circle.world.x, circle_y_pos : circle.world.y,
                          square_x_pos : square.world.x, square_y_pos : square.world.y,
                          index: index});
          this.addButtons();
        }, this);
    },

    circle_attack: function(attack) {
      this.destroyCircle();
      index = 1;
      var attacks = {
        high : {
          chance : 40,
          dmg : 150
        },
        medium : {
          chance : 65,
          dmg : 75
        },
        low : {
          chance : 95,
          dmg : 40
        }
      };
      var success = Math.floor(Math.random() * 100);
      if(success <= attacks[attack].chance) {
        square_health -= attacks[attack].dmg;
        this.squareHealth.setPercent(square_health/500 * 100);
      }
      this.addButtons();
    },

    destroyCircle: function () {
      offense_low.destroy();
      offense_medium.destroy();
      offense_high.destroy();
      circle_forward.destroy();
      circle_backwards.destroy();
    },

    setposdata: function (data) {
      $.post("/setposdata", data);
    }
  }
