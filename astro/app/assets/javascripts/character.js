var character = function(game) {};
var input;
var user;

function submit(game) {
  if (input.text._text !== "") {
    $.ajax({
      url: "/showStats?name=" + input.text._text + "&user=" + user,
      async: true,
      success: function(data) {
        if (data.name == 0){
          $.post("/newCharacter", {"name" : input.text._text, "user" : user});
          $.post("/defaultItems", {"items" : getFreeItems(input.text._text)});
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
    async: true,
    success: function(data) {
      if (data.owner) {
          console.log(data.name)
          game.character = data.name
        /*if (data.inGame == null) {
          game.state.start("theGame");
        }
        else*/
          game.state.start("HomeBase");
      }
    }
  });
};

function getFreeItems(charName) {
  var chest = { "item_type" : "chest", "mainstat_name" : "armour", "mainstat" : 30,
   "secondarystat_name" : "health", "secondarystat" : 20, "owner" : charName };
  var feet = { "item_type" : "feet", "mainstat_name" : "armour", "mainstat" : 25,
   "secondarystat_name" : "health", "secondarystat" : 15, "owner" : charName };
  var phaser = { "item_type" : "phase", "mainstat_name" : "damage", "mainstat" : 47,
   "secondarystat_name" : "speed", "secondarystat" : 0.333, "owner" : charName };
  var melee = { "item_type" : "melee", "mainstat_name" : "damage", "mainstat" : 63,
   "secondarystat_name" : "speed", "secondarystat" : 0.333, "owner" : charName };

  var arr = [];
  arr.push(chest);
  arr.push(feet);
  arr.push(phaser);
  arr.push(melee);

  return arr;
}

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
