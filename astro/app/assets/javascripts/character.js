var character = function(game) {};
var input;
var user;

function submit(game) {
  if (input.text._text !== "") {
    $.ajax({
      url: "/showStats?name=" + input.text._text + "&user=" + user,
      async: false,
      success: function(data) {
        if (data.name == 0){
          $.post("/newCharacter", {"name" : input.text._text, "user" : user});
          game.state.start("HomeBase");
        }
        else {
          input.setText("");
          alert("Name Already Taken!");
        }
      }
    });
  }
};

function existCheck(game) {
  $.ajax({
    url: "/doesHave?user=" + user,
    async: false,
    success: function(data) {
      if (data.data == 1) {
        game.state.start("HomeBase");
      }
    }
  });
};

  character.prototype = {
    create: function() {
      this.game.stage.backgroundColor = "#142f5b"
      user = this.game.user;
      existCheck(this.game);
      this.game.add.plugin(PhaserInput.Plugin);
      input = this.game.add.inputField(545, 300, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Character Name',
        type: PhaserInput.InputType.text
      });
      input.blockInput = false;
      this.game.input.keyboard.onDownCallback = function() {
        if(this.game.input.keyboard.event.keyCode == 13)
          submit(this.game);
      };
    }
  }
