var homebase = function(game) {};

var house;
var portal;
var shop;
var events;
var arena;
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
                   if (inventory_ == undefined) {
                     inventory_ = new Phaser.Game(1136, 350, Phaser.CANVAS, 'inventory', { create: create, preload: preload });

                     function preload() {
                       inventory_.load.spritesheet('square', 'assets/square1.png', 100, 100);
                     }

                     function create() {
                       var item = inventory_.add.sprite(900, 50, 'square');
                       var helmet = inventory_.add.sprite(100, 50, 'square');
                       helmet.anchor.setTo(0.5);
                       item.anchor.setTo(0.5);

                       item.inputEnabled = true;
                       item.input.enableDrag(true);
                       item.originalPosition = item.position.clone();

                       item.events.onDragStop.add(function(currentSprite) {
                         stopDrag(currentSprite, helmet);
                       }, this);
                     }

                     function stopDrag(currentSprite, endSprite){
                        if (!Phaser.Rectangle.intersects(currentSprite, endSprite)) {
                            currentSprite.position.copyFrom(currentSprite.originalPosition);
                        }
                        else {
                            currentSprite.position.copyFrom(endSprite.position);
                        }
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
    },

    inventory: function() {

    }

  }
