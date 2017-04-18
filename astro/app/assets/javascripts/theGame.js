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
      this.addButtons();
    },

    addButtons: function() {
      if (index == 0) {
        if (square_j != undefined) {
          this.destroySquare();
        }
        circle_j = this.game.add.button(50, 580, 'square', this.circle_duck, this, 2, 1, 0);
        circle_d = this.game.add.button(200, 580, 'square', this.circle_jump, this);
        circle_f = this.game.add.button(350, 580, 'square', this.circle_backwards, this);
        circle_b = this.game.add.button(500, 580, 'square', this.circle_forward, this);
      }
      else {
        if (circle_j != undefined) {
          this.destroyCircle();
        }
        square_j = this.game.add.button(1100, 580, 'square', this.square_duck, this);
        square_d = this.game.add.button(950, 580, 'square', this.square_jump, this);
        square_f = this.game.add.button(800, 580, 'square', this.square_backwards, this);
        square_b = this.game.add.button(650, 580, 'square', this.square_forward, this);
      }
    },

    circle_forward: function () {
      this.destroyCircle();
      index = 1;
      tween = this.game.add.tween(circle).to( { x: circle.world.x + 100 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
    },

    circle_backwards: function () {
      this.destroyCircle();
      index = 1;
      tween = this.game.add.tween(circle).to( { x: circle.world.x - 100 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
    },

    circle_jump: function () {
      this.destroyCircle();
      index = 1;
      tween = this.game.add.tween(circle).to( { y: circle.world.y - 100 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
    },

    circle_duck: function () {
      this.destroyCircle();
      index = 1;
      tween = this.game.add.tween(circle).to( { y: circle.world.y + 30 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
    },

    square_forward: function () {
      this.destroySquare();
      index = 0;
      tween = this.game.add.tween(square).to( { x: square.world.x + 100 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
    },

    square_backwards: function () {
      this.destroySquare();
      index = 0;
      tween = this.game.add.tween(square).to( { x: square.world.x - 100 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
    },

    square_jump: function () {
      this.destroySquare();
      index = 0;
      tween = this.game.add.tween(square).to( { y: square.world.y - 100 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
    },

    square_duck: function () {
      this.destroySquare();
      index = 0;
      tween = this.game.add.tween(square).to( { y: square.world.y + 30 }, 2000, Phaser.Easing.Out , true);
      tween.onComplete.add( this.addButtons, this );
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
    }

  }
