var homebase = function(game) {};

var house;
var portal;
var shop;
var events;
var arena;
var helmet;
var chest;
var shoulders;
var thighs;
var legs;
var phaser;
var melee;
var loaded_items = [];
var x_item_offset = 720;
var y_item_offset = 275;
var items = [];
var sprites = {};
var reg = {};

  homebase.prototype = {
    create: function() {
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
      var inventory_;
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
                   el = document.getElementById("inventory");
                   el.style.visibility = "hidden";
                   window.scrollTo(0, 0);
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
                   var user = this.game.user;
                   if (inventory_ == undefined) {
                     inventory_ = new Phaser.Game(1074, 570, Phaser.CANVAS, 'inventory', { create: create, preload: preload });

                     function preload() {
                       inventory_.state.backgroundColor = "#ffffff";
                       inventory_.load.spritesheet('square', '/assets/Game/square1.png', 100, 100);
                       inventory_.load.spritesheet('item', '/assets/Inventory/item1.png', 80, 80);
                       inventory_.load.image('inventory', '/assets/Inventory/inventory.png');
                     }

                     function create() {
                       var back = inventory_.add.image(-60, -15, 'inventory');
                       back.scale.set(1.05);
                       //var save = inventory_.add.button(274, 503, 'item', saveItems, this);
                       //save.anchor.setTo(0.5,0.5);
                       sprites['helmet'] = inventory_.add.sprite(173, 102, 'item');
                       sprites['chest'] = inventory_.add.sprite(173, 228, 'item');
                       sprites['shoulders'] = inventory_.add.sprite(72, 228, 'item');
                       sprites['legs'] =  inventory_.add.sprite(114, 403, 'item');
                       sprites['feet'] =  inventory_.add.sprite(114, 503, 'item');
                       sprites['phase'] =  inventory_.add.sprite(274, 229, 'item');
                       sprites['melee'] =  inventory_.add.sprite(274, 333, 'item');

                       $.ajax({
                         url: "/doesHave?user=" + user,
                         async: false,
                         success: function(data) {
                           var name = data.name;
                           $.ajax({
                             url: "/getAll?user=" + name,
                             async: false,
                             success: function(data) {
                               Array.prototype.push.apply(items, data);
                               Array.prototype.push.apply(items, data);
                             }
                           });
                         }
                       });
                       loadItems();
                       for (key in sprites) {
                         sprites[key].anchor.setTo(0.5, 0.5);
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
                          var sprite_ = inventory_.add.sprite(1136 - x_item_offset, 350 - y_item_offset, "item");
                          sprite_.stats = element;
                          sprite_.anchor.setTo(0.5,0.5);
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


                   el = document.getElementById("inventory");
                   el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
                   window.scrollTo(0, 0);
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
                   reg.modal.hideModal("house");
                   el = document.getElementById("inventory");
                   el.style.visibility = "hidden";
                   window.scrollTo(0, 0);
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
                   reg.modal.hideModal("house");
                   el = document.getElementById("inventory");
                   el.style.visibility = "hidden";
                   window.scrollTo(0, 0);
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
                    this.game.state.start("theGame");
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
                      content: "C"

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
    },

    openPortal: function() {
      reg.modal.showModal("portal");
      this.portal();
      
      function preload() {
          portal.load.spritesheet();
      }

      function create() {
          portal.add.sprite(100, 50, 'square');
      }
    },

    inventory: function() {

    },

    portal: function () {
          portal = new Phaser.Game(1200, 600, Phaser.CANVAS, 'portal', { create: create, preload: preload });
    }
  }
