var homebase = function(game) {};

var house;
var inventory;
var gadgets;
var potions;
var shop;
var shop_;
var portal;
var inPortal;
var events;
var user;
var arena;
var url;
var reg = {};
var character;

function hide_elements(elements) {
  for (elem of elements) {
    el = document.getElementById(elem)
    el.style.visibility = "hidden"
  }
}

function toggle_element(element) {
  el = document.getElementById(element)
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible"
}

function openGadgets() {
  homebase.prototype.openGadgets()
}

function openPotions() {
  homebase.prototype.openPotions()
}

function openInventory() {
  homebase.prototype.openInventory()
}

  homebase.prototype = {
    create: function() {
      character = this.game.character
      user = this.game.user
      url = "http://localhost:3000/battle/"+character;
      reg.modal = new gameModal(this.game);
      this.createModals();
      fullscreen = this.game.add.button(1200, 50, 'square', this.switch_to_fs, this);
      house = this.game.add.button(100, 400, 'square', this.openHouse, this);
      arena = this.game.add.button(1100, 400, 'square', this.openArena, this);
      shop = this.game.add.button(200, 200, 'square', this.openShop, this);
      portal = this.game.add.button(1000, 200, 'square', this.openPortal, this);
    },

    switch_to_fs: function() {
      this.game.scale.fullscreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        }
      else {
          this.game.scale.startFullScreen(false);
      }
    },

    createModals: function() {
      reg.modal.createModal({
           type: "house",
           includeBackground: true,
           modalCloseOnInput: false,
           backgroundOpacity: 0.8,
           itemsArr: [
               {
                   type: "text",
                   content: "House",
                   fontFamily: "Courier",
                   fontSize: 38,
                   color: "0xFEFF49",
                   offsetY: -340,
                   stroke: "0x000000",
                   strokeThickness: 5
               },
               {
                 type: "text",
                 content: "X",
                 fontFamily: "Arial",
                 color: "ffffff",
                 offsetY: -350,
                 offsetX: 600,
                 stroke: "0x000000",
                 strokeThickness: 5,
                 callback: function() {
                   reg.modal.hideModal("house");
                   hide_elements(["potions", "gadgets", "inventory"])
                 }
               },
               {
                 type: "text",
                 content: "Inventory",
                 fontFamily: "Courier",
                 fontSize: 40,
                 color: "ffffff",
                 offsetY: -260,
                 offsetX: -400,
                 stroke: "0x000000",
                 strokeThickness: 5,
                 callback: function() {
                   hide_elements(["potions", "gadgets"])
                   openInventory()
                 }
               },
               {
                 type: "text",
                 content: "Gadgets",
                 fontFamily: "Courier",
                 fontSize: 40,
                 color: "ffffff",
                 offsetY: -260,
                 stroke: "0x000000",
                 strokeThickness: 5,
                 callback: function() {
                   hide_elements(["potions", "inventory"])
                   openGadgets()
                 }
               },
               {
                 type: "text",
                 content: "Potions",
                 fontFamily: "Courier",
                 fontSize: 40,
                 color: "ffffff",
                 offsetY: -260,
                 offsetX: 400,
                 stroke: "0x000000",
                 strokeThickness: 5,
                 callback: function() {
                   hide_elements(["inventory", "gadgets"])
                   openPotions()

                 }
               }
           ]
       });

       reg.modal.createModal({
            type: "arena",
            includeBackground: true,
            modalCloseOnInput: true,
            backgroundOpacity: 0.8,
            itemsArr: [
                {
                    type: "text",
                    content: "Arena",
                    fontFamily: "Courier",
                    fontSize: 38,
                    color: "0xFEFF49",
                    offsetY: -340,
                    stroke: "0x000000",
                    strokeThickness: 5
                },
                {
                  type: "text",
                  content: "X",
                  fontFamily: "Arial",
                  color: "ffffff",
                  offsetY: -350,
                  offsetX: 600,
                  stroke: "0x000000",
                  strokeThickness: 5,
                  callback: function() {
                    reg.modal.hideModal("arena");
                  }
                },
                {
                  type: "text",
                  content: "To Arena",
                  fontFamily: "Arial",
                  color: "ffffff",
                  stroke: "0x000000",
                  strokeThickness: 5,
                  callback: function() {
                    reg.modal.hideModal("arena");
                    // window.location.assign(url)
                  }
                }
            ]
        });

        reg.modal.createModal({
             type: "shop",
             includeBackground: true,
             modalCloseOnInput: true,
             backgroundOpacity: 0.8,
             itemsArr: [
                 {
                     type: "text",
                     content: "Shop",
                     fontFamily: "Courier",
                     fontSize: 38,
                     color: "0xFEFF49",
                     offsetY: -340,
                     stroke: "0x000000",
                     strokeThickness: 5
                 },
                 {
                   type: "text",
                   content: "X",
                   fontFamily: "Arial",
                   color: "ffffff",
                   offsetY: -350,
                   offsetX: 600,
                   stroke: "0x000000",
                   strokeThickness: 5,
                   callback: function() {
                     reg.modal.hideModal("shop");
                     hide_elements(["shop"])
                   }
                 }
             ]
         });

         reg.modal.createModal({
              type: "portal",
              includeBackground: true,
              modalCloseOnInput: true,
              backgroundOpacity: 0.8,
              itemsArr: [
                  {
                      type: "text",
                      content: "Portal",
                      fontFamily: "Courier",
                      fontSize: 38,
                      color: "0xFEFF49",
                      offsetY: -340,
                      stroke: "0x000000",
                      strokeThickness: 5
                  },
                  {
                    type: "text",
                    content: "X",
                    fontFamily: "Arial",
                    color: "ffffff",
                    offsetY: -350,
                    offsetX: 600,
                    stroke: "0x000000",
                    strokeThickness: 5,
                    callback: function() {
                      reg.modal.hideModal("portal");
                      hide_elements(["portal"])
                    }
                  }
              ]
          });
    },

    openHouse: function() {
      reg.modal.showModal("house");
    },

    openArena: function() {
      reg.modal.showModal("arena");
    },

    openShop: function() {
      reg.modal.showModal("shop");
      this.shop();
    },

    openPortal: function() {
      reg.modal.showModal("portal");
      this.portal(this.game);
    },

    shop: function () {
      var page = 1;
      var shoparr = [];
      var loadmem = [];
      var offset = 0;
      var test = [3, 2, 1, 0];
      if (shop_ == undefined) {
        shop_ = new Phaser.Game(1074, 570, Phaser.CANVAS, 'shop', {create: create, preload: preload});
        var shop_items = shop_.add.group();

        function preload() {

        }

        function create() {
          $.ajax ({
            url: "/getShopitems",
            async: false,
            success: function (data, status) {
              shoparr = data;
            }
          })
          if (shoparr.length != 0) {
            var left = shop_.add.button(50, shop_.world.centerY, 'square', left, this);
            var right = shop_.add.button(1050, shop_.world.centerY, 'square', right, this);
            left.anchor.set(0.5);
            right.anchor.set(0.5);

            setter();

          } else {
            var emptyShop = shop_.add.text(shop_.world.centerX, shop_.world.centerY, "The shop is empty", { font: "65px Arial", fill: "#ff0044", align: "center" });
            emptyShop.anchor.setTo(0.5, 0.5);
          }
        }

        function setter(offset) {
          if (offset + 4 <= shoparr.length) {
            var memlen = offset + 4;
            for (var i = offset; i < memlen; i++) {
              displayItem(offset, 200 * ((offset + 1) % 4));
              offset++;
            }
          }
          else {
            for (var i = offset; i < shoparr.length; i++) {
              displayItem(offset, 200 * ((offset + 1) % 4));
              offset++;
            }
          }
        }

        function left() {
          if (page > 1) {
            var memlen = offset - 4;
            for (var i = offset; i > memlen; idea) {
              destroyItem(loadmem[i]);
            }
            offset -= 4;
            setter();
            page -= 1;
          }
        }

        function right() {
          if (page < shop_items.length/4 + 1) {
            var memlen = offset - 4;
            for (var i = offset; i > memlen; idea) {
              destroyItem(loadmem[i]);
            }
            setter();
            page += 1;
          }
        }

        function buy(index) {
          if (shoparr.length >= index * page) {
            shoparr.splice(index * page, 1);
            console.log(index);
          }
        }

        function displayItem(offset, cordsX) {
            loadmem[offset] = shop_.add.button(cordsX, shop_.world.centerY, 'square', function () {
            buy((offset + 1) % 4);
            }, this);
            loadmem[offset].anchor.set(0.5);
            shop_items.add(loadmem[offset]);
        }

        function destroyItem(id) {
          id.destroy();
        }

      }
      toggle_element("shop")
    },

    portal: function(game) {
      if (inPortal == undefined) {
        inPortal = new Phaser.Game(1074, 570, Phaser.CANVAS, 'portal', { create: create, preload: preload });
        var bossName = "boss";
        var bossNumber = 0;
        var bossImage;

        function preload() {
            inPortal.load.spritesheet('right-arrow', 'assets/Arrows/right-arrow.png');
            inPortal.load.spritesheet('left-arrow', 'assets/Arrows/left-arrow.png');
            inPortal.load.spritesheet('play-button', 'assets/Portal/play-button.png');
            inPortal.load.image('background', 'assets/Portal/background.png');
            /*
              Preloading all the bosses
             */
            for (var i = 0; i < 3; i++) {
              bossNumber = i;
              inPortal.load.spritesheet(bossName + bossNumber.toString(), 'assets/Portal/Bosses/' + bossName + bossNumber.toString() + '.png');
            }

            bossNumber = 0;
        }

        function create() {
          /*
            Adding background
           */
          inPortal.add.sprite(0, 0, 'background');

          var leftArrow = inPortal.add.button(inPortal.world.centerX, inPortal.world.centerY, 'left-arrow', buttonLeftArrow, this);

          console.log("boss image : " + bossName + bossNumber.toString());

          var rightArrow = inPortal.add.button(inPortal.world.centerX, inPortal.world.centerY, 'right-arrow', buttonRightArrow, this);

          var playButton = inPortal.add.button(inPortal.world.centerX, inPortal.world.centerY, 'play-button', fight, this);

          bossImage = inPortal.add.sprite(inPortal.world.centerX - 100, inPortal.world.centerY - 50, bossName + bossNumber.toString());

          leftArrow.anchor.setTo(4.5, 0.5);
          rightArrow.anchor.setTo(-3.5, 0.5);
          playButton.anchor.setTo(0.5, -4);
        }

        function buttonLeftArrow() {
          if (bossNumber != 0) {
            bossNumber -= 1;
            update();
          }
        }

        function buttonRightArrow() {
          if (bossNumber < 2) {
            bossNumber += 1;
            update();
          }
        }

        function update() {
            bossImage.destroy();
            console.log(this.game.user)

            console.log("boss image : " + bossName + bossNumber.toString());
            bossImage = inPortal.add.sprite(inPortal.world.centerX - 100, inPortal.world.centerY - 50, bossName + bossNumber.toString());
        }

        function fight() {

          toggle_element("portal")
          window.location.assign(url + "/" + bossName + bossNumber.toString())
        }
      }
      toggle_element("portal")
    },

    openGadgets: function () {

      if (gadgets == undefined) {
        gadgets = new Phaser.Game(1074, 570, Phaser.CANVAS, 'gadgets', { create: create, preload: preload });

        var gadgetsArr = [];
        var ind = 0;

        var gadgetImage;

        var powerStat;
        var gadgetPower;
        var gadgetPowerSprite;

        var healthStat;
        var gadgetHealth;
        var gadgetHealthSprite;

        function preload() {
          gadgets.load.spritesheet('leftArrow', 'assets/downloadedAssets/left arrow.png');
          gadgets.load.spritesheet('rightArrow', 'assets/downloadedAssets/right arrow.png');

          gadgets.load.spritesheet('gadgetHealthSprite', 'assets/downloadedAssets/Status.png');
          gadgets.load.spritesheet('gadgetPowerSprite', 'assets/downloadedAssets/Power.png');

          for (var i = 0; i < 3; i++) {
            gadgets.load.spritesheet('gadget' + i, 'assets/gadgets/gadget' + i + '.png');
          }
        }

        function create() {
          console.log('in create function');
          $.ajax({
            url: '/getGadgets?owner=' + character,
            async: false ,
            success: function (data) {
              gadgetsArr = data;
            }
          });

          if (gadgetsArr.length != 0) {

            var left = gadgets.add.button(115, gadgets.world.centerY, 'leftArrow', leftButton, this);
            var right = gadgets.add.button(960, gadgets.world.centerY, 'rightArrow', rightButton, this);
            left.anchor.set(0.5);
            right.anchor.set(0.5);

            displayGadget(ind);

          } else {
            var noGadgets = gadgets.add.text(gadgets.world.centerX, gadgets.world.centerY, "You don't have any gadgets yet!", { font: "65px Arial", fill: "#ff0044", align: "center" });
            noGadgets.anchor.set(0.5);
          }

        }

        function displayGadget(index) {
          if (index < gadgetsArr.length) {
           style = { font: "35px Arial", fill: "#ff0044", align: "center" }

           if (gadgetImage !== undefined) gadgetImage.destroy()
           gadgetImage = gadgets.add.sprite(gadgets.world.centerX, gadgets.world.centerY - 200, gadgetsArr[index].name);
           gadgetImage.anchor.set(0.5);

           if (healthStat !== undefined) healthStat.destroy()
           if (gadgetHealthSprite == undefined)
             gadgetHealthSprite = gadgets.add.sprite(gadgets.world.centerX - 100, 250, 'gadgetHealthSprite');
            healthStat = gadgets.add.text(gadgets.world.centerX, 250, '+ ' + gadgetsArr[index].bonus_health.toString(), style);
            gadgetHealthSprite.anchor.set(0.5);
            gadgetHealthSprite.scale.set(0.5);
            healthStat.anchor.set(0.5)

           if (powerStat !== undefined) powerStat.destroy()
           if (gadgetPowerSprite == undefined)
            gadgetPowerSprite = gadgets.add.sprite(gadgets.world.centerX - 100, 350, 'gadgetPowerSprite');
           powerStat = gadgets.add.text(gadgets.world.centerX, 350, '+ ' + gadgetsArr[index].bonus_power.toString(), style);
           powerStat.anchor.set(0.5);
           gadgetPowerSprite.anchor.set(0.5);
           gadgetPowerSprite.scale.set(0.5);

            gadgets.add.button(gadgets.world.centerX, 450, 'updateGadgetButton', updateGadget, this);
          }
          else {
            console.log("Exception: index out of arange");
          }
        }

        function updateGadget() {

          for (var i = 0; i < gadgetsArr.length; i++) {

            if (gadgetsArr[i].equipped == 1) {
              if (ind != i) {
                gadgetsArr[i].equipped = 0;
                temp = gadgetsArr[i]
                delete temp.created_at
                delete temp.updated_at
                $.ajax ({
                  type: 'PUT',
                  async: true,
                  url: '/updateGadgets',
                  data: {gadget : temp}
                });
              }
            }
          }

          gadgetsArr[ind].equipped = 1;
          temp = gadgetsArr[ind]
          delete temp.created_at
          delete temp.updated_at
          $.ajax ({
            type: 'PUT',
            async: true,
            url: '/updateGadgets',
            data: {gadget : temp}
          });
        }
        function leftButton() {
          if (ind > 0) {
            ind--;
            displayGadget(ind);
          }
        }

        function rightButton() {
          if (ind < gadgetsArr.length - 1) {
            ind++;
            displayGadget(ind);
          }
        }
      }
      toggle_element("gadgets");
    },

    openPotions: function () {
      if (potions == undefined) {
        potions = new Phaser.Game(1074, 570, Phaser.CANVAS, 'potions', { create: create, preload: preload });

        var potionsArr = [];
        var ind = 0;

        var potionImage;

        var powerStat;
        var potionPower;
        var potionPowerSprite;

        var buttonUse
        var potionAlreadyUsed

        var healthStat;
        var potionHealth;
        var potionHealthSprite;

        function preload() {
          potions.load.spritesheet('leftArrow', 'assets/downloadedAssets/left arrow.png');
          potions.load.spritesheet('rightArrow', 'assets/downloadedAssets/right arrow.png');

          potions.load.spritesheet('potionHealthSprite', 'assets/downloadedAssets/Status.png');
          potions.load.spritesheet('potionPowerSprite', 'assets/downloadedAssets/Power.png');
          for (var i = 1; i < 4; i++) {
            console.log('potion' + i);
            potions.load.spritesheet('potion' + i, 'assets/Potions/potion' + i + '.png');
          }
        }

        function create() {
          $.ajax({
            url: '/getPotions?owner=' + character,
            async: false,
            success: function (data) {
              potionsArr = data;
            }
          });

          if (potionsArr.length != 0) {
            var left = potions.add.button(115, potions.world.centerY, 'leftArrow', leftButton, this);
            var right = potions.add.button(960, potions.world.centerY, 'rightArrow', rightButton, this);
            left.anchor.set(0.5);
            right.anchor.set(0.5);

            displayPotion(ind);
          } else {
            var noPotions = potions.add.text(potions.world.centerX, potions.world.centerY, "You don't have any potions yet!", { font: "65px Arial", fill: "#ff0044", align: "center" });
            noPotions.anchor.set(0.5);
          }
        }

        function displayPotion(index) {
          if (index < potionsArr.length) {
            if(buttonUse != undefined) buttonUse.destroy()
            if(potionAlreadyUsed != undefined) potionAlreadyUsed.destroy()

            style = { font: "35px Arial", fill: "#ff0044", align: "center" }
            if (potionImage !== undefined) potionImage.destroy()
            potionImage = potions.add.sprite(potions.world.centerX, potions.world.centerY - 200, potionsArr[index].name);
            potionImage.anchor.set(0.5);

            if (healthStat != undefined) healthStat.destroy()
            if (potionHealthSprite == undefined)
              potionHealthSprite = potions.add.sprite(potions.world.centerX - 100, 250, 'potionHealthSprite');
            healthStat = potions.add.text(potions.world.centerX, 250, '+ ' + potionsArr[index].bonus_health, style);
            potionHealthSprite.anchor.set(0.5);
            potionHealthSprite.scale.set(0.5);
            healthStat.anchor.set(0.5)

            if (powerStat != undefined) powerStat.destroy()
            if (potionPowerSprite == undefined)
              potionPowerSprite = potions.add.sprite(potions.world.centerX - 100, 350, 'potionPowerSprite');
            powerStat = potions.add.text(potions.world.centerX, 350, '+ ' + potionsArr[index].bonus_power.toString(), style);
            powerStat.anchor.set(0.5);
            potionPowerSprite.anchor.set(0.5);
            potionPowerSprite.scale.set(0.5);

            if (potionsArr[index].used == 0) {
              buttonUse = potions.add.button(potions.world.centerX, 450, 'updatePotionButton', usePotion, this);
              buttonUse.anchor.set(0.5);
            } else {
              potionAlreadyUsed = potions.add.text(potions.world.centerX, 450, "You have already used that potion!", { font: "20px Arial", fill: "#ff0044", align: "center" });
              potionAlreadyUsed.anchor.set(0.5);
            }
          } else {
            console.log("Exception: index out of arange");
          }
        }

        function usePotion() {
          potionsArr[ind].used = 1;
          temp = potionsArr[ind]
          delete temp.created_at
          delete temp.updated_at
          $.ajax ({
            type: 'PUT',
            async: true,
            url: '/updatePotions',
            data: {potion : temp}
          });
        }

        function leftButton() {
          if (ind > 0) {
            ind--;
            displayPotion(ind);
          }
        }

        function rightButton() {
          if (ind < potionsArr.length - 1) {
            ind++;
            displayPotion(ind);
          }
        }
      }
      toggle_element("potions")
    },

    openInventory: function () {

      var loaded_items = [];
      var x_item_offset = 720;
      var y_item_offset = 275;
      var items = [];
      var equipment = [];
      var sprites = {};

      if (inventory == undefined) {
        inventory = new Phaser.Game(1074, 570, Phaser.CANVAS, 'inventory', { create: create, preload: preload });

        function preload() {
          inventory.state.backgroundColor = "#ffffff";
          inventory.load.spritesheet('square', '/assets/Game/square1.png');
          inventory.load.spritesheet('item', '/assets/Inventory/item1.png');
          inventory.load.image('inventory', '/assets/Inventory/inventory.png');
        }

        function create() {
          var back = inventory.add.image(-60, -15, 'inventory');
          back.scale.set(1.05);
          // var save = inventory.add.button(274, 503, 'item', saveItems, this);
          // save.anchor.set(0.5);
          sprites['helmet'] = inventory.add.sprite(173, 102, 'item');
          sprites['chest'] = inventory.add.sprite(173, 228, 'item');
          sprites['shoulders'] = inventory.add.sprite(72, 228, 'item');
          sprites['legs'] =  inventory.add.sprite(114, 403, 'item');
          sprites['feet'] =  inventory.add.sprite(114, 503, 'item');
          sprites['phase'] =  inventory.add.sprite(274, 229, 'item');
          sprites['melee'] =  inventory.add.sprite(274, 333, 'item');

          $.ajax({
            url: "/getAll?owner=" + character,
            async: false,
            success: function(data) {
              Array.prototype.push.apply(items, data);
            }
          });

          loadItems();
          for (key in sprites) {
            sprites[key].anchor.set(0.5);
          }
        }

        function stopDrag(currentSprite, endSprite){
           if (!Phaser.Rectangle.intersects(currentSprite, endSprite)) {
               currentSprite.position.copyFrom(currentSprite.originalPosition);
           }
           else {
               currentSprite.position.copyFrom(endSprite.position);
               currentSprite.anchor = endSprite.anchor;
               endSprite.stats = currentSprite.stats;
           }
         }

         function loadItems() {
           var count = 0;
           items.forEach(function(element, index, array) {
             var sprite_ = inventory.add.sprite(1136 - x_item_offset, 350 - y_item_offset, "item");
             sprite_.stats = element;
             sprite_.anchor.set(0.5);
             sprite_.inputEnabled = true;
             sprite_.input.enableDrag(true);
             sprite_.originalPosition = sprite_.position.clone();
             sprite_.events.onDragStop.add(function(currentSprite) {
               stopDrag(currentSprite, sprites[sprite_.stats.item_type]);
             });
             loaded_items.push(sprite_);
             count++;
             if ((loaded_items.length) % 6 == 0) {
               y_item_offset -= count == 6*2 ? "103" : "112";
               x_item_offset += 118*2 + 115*3;
             }
             else if ((loaded_items.length) % 2 == 0) {
               x_item_offset -= 118;
             }
             else
               x_item_offset -= 115;
           });
         }
      }
      toggle_element("inventory")
    }
  }
