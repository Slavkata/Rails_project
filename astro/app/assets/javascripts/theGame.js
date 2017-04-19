var theGame = function(game) {};
var index = 0;
var circle_j;
var circle_d;
var circle_f;
var circle_b;

var square_j;
var square_f;
var square_d;
var square_b;

var circle;
var square;
var tween;

  theGame.prototype = {
    create: function() {
      square = this.game.add.sprite(1100, 400, 'square');
      circle = this.game.add.sprite(100, 400, 'circle');
      $.get("/getposdata", function(data, status) {
        square.x = data.square_x_pos;
        square.y = data.square_y_pos;
        circle.x = data.circle_x_pos;
        circle.y = data.circle_y_pos;
      });
      this.addButtons();
    },


    addButtons: function() {
      if (index == 0) {
        if (square_j != undefined) {
          this.destroySquare();
        }
        circle_j = this.game.add.button(50, 580, 'square', function() {
                  this.circle_move({y: circle.world.y + 30 })
                  }, this);
        circle_d = this.game.add.button(200, 580, 'square', function() {
                  this.circle_move({ y: circle.world.y - 100 })
                  }, this);
        circle_b = this.game.add.button(500, 580, 'square', function() {
                  this.circle_move({ x: circle.world.x + 100 })
                  }, this);
        circle_f = this.game.add.button(350, 580, 'square', function() {
                  this.circle_move({ x: circle.world.x - 100 })
                  }, this);
      }
      else {
        console.log(circle.world.x);
        console.log(circle.world.y);
        if (circle_j != undefined) {
          this.destroyCircle();
        }
        square_j = this.game.add.button(1100, 580, 'square', function() {
                  this.square_move({ y: square.world.y + 30 })
                  }, this);
        square_d = this.game.add.button(950, 580, 'square', function() {
                  this.square_move({ y: square.world.y - 100 })
                  }, this);
        square_f = this.game.add.button(800, 580, 'square', function() {
                  this.square_move({ x: square.world.x + 100 })
                  }, this);
        square_b = this.game.add.button(650, 580, 'square', function() {
                  this.square_move({ x: square.world.x - 100 })
                  }, this);
      }
    },

    circle_move: function (where) {
      this.destroyCircle();
      index = 1;
      tween = this.game.add.tween(circle).to(where, 2000, Phaser.Easing.Out, true);
      tween.onComplete.add(function() {
          this.setposdata({ circle_x_pos : circle.world.x, circle_y_pos : circle.world.y,
                            square_x_pos : square.world.x, square_y_pos : square.world.y});
          this.addButtons();
        }, this);
    },

    square_move: function(where) {
      this.destroySquare();
      index = 0;
      tween = this.game.add.tween(square).to( where, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add(function() {
        this.setposdata({ circle_x_pos : circle.world.x, circle_y_pos : circle.world.y,
                          square_x_pos : square.world.x, square_y_pos : square.world.y});
          this.addButtons();
        }, this);
    },

    destroyCircle: function () {
      circle_j.destroy();
      circle_d.destroy();
      circle_f.destroy();
      circle_b.destroy();
    },

    destroySquare: function () {
      square_j.destroy();
      square_d.destroy();
      square_f.destroy();
      square_b.destroy();
    },

    setposdata: function (data) {
      $.post("/setposdata", data);
    }
  }
