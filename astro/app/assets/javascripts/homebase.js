var homebase = function(game) {};

var house;
var portal;
var shop;
var events;
var arena;
var loaded_items = [];
var x_item_offset = 370;
var y_item_offset = 330;
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
                   offsetY: -270,
                   stroke: "0x000000",
                   strokeThickness: 5
               },
               {
                 type: "text",
                 content: "X",
                 fontFamily: "Arial",
                 color: "#9b180c",
                 offsetY: -280,
                 offsetX: 500,
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
                 color: "#9b180c",
                 offsetY: -180,
                 offsetX: -400,
                 stroke: "0x000000",
                 strokeThickness: 5,
                 callback: function() {
                   var user = this.game.user;
                   if (inventory_ == undefined) {
                     inventory_ = new Phaser.Game(1136, 350, Phaser.CANVAS, 'inventory', { create: create, preload: preload });

                     function preload() {
                       inventory_.load.spritesheet('square', 'assets/square1.png', 100, 100);
                       inventory_.load.spritesheet('item', '/assets/item1.png', 50, 50);
                     }

                     function create() {
                       var helmet = inventory_.add.sprite(100, 50, 'square');
                       $.ajax({
                         url: "/doesHave?user=" + user,
                         async: false,
                         success: function(data) {
                           var name = data.name;
                           $.ajax({
                             url: "/getAll?user=" + name,
                             async: false,
                             success: function(data) {
                               items = data;
                             }
                           });
                         }
                       });
                       loadItems();
                       helmet.anchor.setTo(0.5);
                       sprites['chest'] = helmet;
                       sprites['feet'] = helmet;
                       sprites['phase'] = helmet;
                       sprites['melee'] = helmet;
                     }

                     function stopDrag(currentSprite, endSprite){
                        if (!Phaser.Rectangle.intersects(currentSprite, endSprite)) {
                            currentSprite.position.copyFrom(currentSprite.originalPosition);
                        }
                        else {
                            currentSprite.position.copyFrom(endSprite.position);
                        }
                      }

                      function loadItems() {
                        items.forEach(function(element, index, array) {
                          var sprite_ = inventory_.add.sprite(1136 - x_item_offset, 350 - y_item_offset, "item");
                          sprite_.stats = element;
                          sprite_.anchor.setTo(1,0);
                          sprite_.inputEnabled = true;
                          sprite_.input.enableDrag(true);
                          console.log(sprite_);
                          sprite_.originalPosition = sprite_.position.clone();
                          sprite_.events.onDragStop.add(function(currentSprite) {
                            stopDrag(currentSprite, sprites[sprite_.stats.item_type]);
                          });
                          loaded_items.push(sprite_);
                          if ((loaded_items.length) % 5 == 0) {
                            y_item_offset -= 70;
                            x_item_offset += 90*5;
                          }
                          else
                            x_item_offset -= 90;
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
                 color: "#9b180c",
                 offsetY: -180,
                 stroke: "0x000000",
                 strokeThickness: 5,
                 callback: function() {
                   reg.modal.hideModal("house");
                 }
               },
               {
                 type: "text",
                 content: "Potions",
                 fontFamily: "Courier",
                 fontSize: 40,
                 color: "#9b180c",
                 offsetY: -180,
                 offsetX: 400,
                 stroke: "0x000000",
                 strokeThickness: 5,
                 callback: function() {
                   reg.modal.hideModal("house");
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
                    offsetY: -270,
                    stroke: "0x000000",
                    strokeThickness: 5
                },
                {
                  type: "text",
                  content: "X",
                  fontFamily: "Arial",
                  color: "#9b180c",
                  offsetY: -280,
                  offsetX: 500,
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
                  color: "#9b180c",
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
                     offsetY: -270,
                     stroke: "0x000000",
                     strokeThickness: 5
                 },
                 {
                   type: "text",
                   content: "X",
                   fontFamily: "Arial",
                   color: "#9b180c",
                   offsetY: -280,
                   offsetX: 500,
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
                      offsetY: -270,
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
                    color: "#9b180c",
                    offsetY: -280,
                    offsetX: 500,
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
