var homebase = function(game) {};

var house;
var gadgets;
var portal;
var inPortal;
var shop;
var shop_;
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

                   if (gadgets == undefined) {

                     gadgets = new Phaser.Game(1074, 570, Phaser.CANVAS, 'portal', { create: create, preload: preload });

                     /*
                      TODO: trqbva da zemem sichki gajeti koito otgovarqt na tozi user kato te imat:
                        -ime
                        -statove

                        =========new===
                        da se dobavi button koito equipva tozi gadget i da se implementira kak trqbva da se pazi koi e equipnat


                      */

                     var gadgetsArr = [];

                     var gadgetImage;

                     var powerStat;
                     var gadgetPower;
                     var gadgetPowerSprite;

                     var healthStat;
                     var gadgetHealth;
                     var gadgetHealthSprite;

                     var gadgetNumber = 0;

                     function preload() {
                       gadgets.load.spritesheet('leftArrow', 'assets/downloadedAssets/left arrow.png');
                       gadgets.load.spritesheet('rightArrow', 'assets/downloadedAssets/right arrow.png');

                       gadgets.load.spritesheet('gadgetHealthSprite', 'assets/downloadedAssets/Status.png');
                       gadgets.load.spritesheet('gadgetPowerSprite', 'assets/downloadedAssets/Power.png');

                       for (var i = 0; i < 3; i++) {
                         gadgetNumber = i;
                        gadgets.load.spritesheet('gadget' + gadgetNumber.toString(), 'assets/gadgets/' + 'gadget' + gadgetNumber.toString() + '.png');
                       }

                     }

                     function create() {
                       $.ajax({
                         url: 'localhost:3000/gadgets?owner=' + this.game.user,
                         async: false,
                         success: function (data) {
                           gadgetsArr = data;
                         }
                       });

                       if (gadgetsArr.length != 0) {

                         var left = shop_.add.button(100, gadgets.world.centerY, 'leftArrow', leftButton, this);
                         var right = shop_.add.button(160, gadgets.world.centerY, 'rightArrow', rightButton, this);
                         left.anchor.set(0.5);
                         right.anchor.set(0.5);

                         displayGadget(0);

                       } else {
                         var noGadgets = gadgets.add.text(gadgets.world.centerX, gadgets.world.centerY, "You don't have any gadgets yet!", { font: "65px Arial", fill: "#ff0044", align: "center" });
                         noGadgets.anchor.setTo(0.5, 0.5);
                       }

                     }
                     function displayGadget(index) {
                       if (index < gadgetsArr.length) {

                         gadgetImage.destroy();
                         gadgetImage = gadgets.add.sprite(150, gadgets.world.centerY, gadgetsArr[index].name);
                         gadgetImage.anchor.setTo(0.5, 0.5);

                         gadgetHealthSprite.destroy();
                         healthStat.destroy();
                         gadgetHealthSprite = gadgets.add.sprite(600, 700, 'gadgetHealthSprite');
                         healthStat = gadgets.add.text(650, 700, '+ ' + gadgetsArr[index].bonus_health.toString(), { font: "35px Arial", fill: "#ff0044", align: "center" });
                         gadgetHealthSprite.anchor.setTo(0.5, 0.5);
                         gadgetHealthSprite.scale.setTo(0.5, 0.5);

                         gadgetPowerSprite.destroy();
                         powerStat.destroy();
                         gadgetPowerSprite = gadgets.add.sprite(600, 650, 'gadgetPowerSprite');
                         powerStat = gadgets.add.text(650, 650, '+ ' + gadgetsArr[index].bonus_power.toString(), { font: "35px Arial", fill: "#ff0044", align: "center" });
                         powerStat.anchor.setTo(0.5, 0.5);
                         gadgetPowerSprite.anchor.setTo(0.5, 0.5);
                         gadgetPowerSprite.scale.setTo(0.5, 0.5);

                       } else {
                         console.log("Exception: index out of arange");
                       }
                     }

                     function leftButton() {
                       if (index > 0) {
                         index--;
                         displayGadget(index);
                       }
                     }

                     function rightButton() {
                       if (index < gadgetsArr.length - 1) {
                         index++;
                         displayGadget(index);
                       }
                     }

                   }

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
                    window.location.assign("http://localhost:3000/battle")
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
                     el = document.getElementById("shop");
                     el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
                     window.scrollTo(0, 0);
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
                      el = document.getElementById("portal");
                      el.style.visibility = "hidden";
                      window.scrollTo(0, 0);
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
            url: "/shop_items",
            async: false,
            success: function (data, status) {
              shoparr = data;
              console.log(shoparr);
            }
          })
          if (shoparr.length != 0) {
            var left = shop_.add.button(50, shop_.world.centerY, 'square', left, this);
            var right = shop_.add.button(1050, shop_.world.centerY, 'square', right, this);
            left.anchor.set(0.5);
            right.anchor.set(0.5);

            setter();

            //TODO: implementation to get the data and to display it dynamic
            /*



            var btn1 = shop_.add.button(200, shop_.world.centerY, 'square', function () {
              buy(1);
            }, this);
            btn1.anchor.set(0.5);
            shop_items.add(btn1);

            var btn2 = shop_.add.button(400, shop_.world.centerY, 'square', function () {
              buy(2);
            }, this);
            btn2.anchor.set(0.5);
            shop_items.add(btn2);
            var btn3 = shop_.add.button(600, shop_.world.centerY, 'square', function () {
              buy(3);
            }, this);
            btn3.anchor.set(0.5);
            shop_items.add(btn3);
            var btn4 = shop_.add.button(800, shop_.world.centerY, 'square', function () {
              buy(4);
            }, this);
            btn4.anchor.set(0.5);
            shop_items.add(btn4);
            */
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
          /*
          switch (offset + 1) {
            case 1: btn1 = shop_.add.button(800, shop_.world.centerY, 'square', function () {
              buy(offset + 1);
              }, this);
              btn1.anchor.set(0.5);
            break;

            case 2: btn2 = shop_.add.button(800, shop_.world.centerY, 'square', function () {
              buy(offset + 1);
              }, this);
              btn2.anchor.set(0.5);
            break;

            case 3: btn3 = shop_.add.button(800, shop_.world.centerY, 'square', function () {
              buy(offset + 1);
              }, this);
              btn1.anchor.set(0.5);
            break;

            case 4: btn4 = shop_.add.button(800, shop_.world.centerY, 'square', function () {
              buy(offset + 1);
              }, this);
              btn1.anchor.set(0.5);
            break;
            default: console.log("Something went wrong!");

          }
           */
        }

        function destroyItem(id) {
          id.destroy();
        }

      }
      el = document.getElementById("shop");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
      window.scrollTo(0, 0);
    },

	portal: function(game) {
          if (inPortal == undefined) {
            inPortal = new Phaser.Game(1074, 570, Phaser.CANVAS, 'portal', { create: create, preload: preload });
            //document.getElementById("overlay").innerHTML += "<div id = \"portal\", class = 'overlay'></div>"
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
              //console.log("Adding left arrow");
              console.log("boss image : " + bossName + bossNumber.toString());

              var rightArrow = inPortal.add.button(inPortal.world.centerX, inPortal.world.centerY, 'right-arrow', buttonRightArrow, this);

              var playButton = inPortal.add.button(inPortal.world.centerX, inPortal.world.centerY, 'play-button', fight, this);

              bossImage = inPortal.add.sprite(inPortal.world.centerX - 100, inPortal.world.centerY - 50, bossName + bossNumber.toString());

              leftArrow.anchor.setTo(4.5, 0.5);
              rightArrow.anchor.setTo(-3.5, 0.5);
              playButton.anchor.setTo(0.5, -4);
              //bossImage.anchor.setTo(-2, 1);
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

                console.log("boss image : " + bossName + bossNumber.toString());
                bossImage = inPortal.add.sprite(inPortal.world.centerX - 100, inPortal.world.centerY - 50, bossName + bossNumber.toString());
            }

            function fight() {

              el = document.getElementById("portal");
              el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
              window.scrollTo(0, 0);
              this.game.bossName = bossName + bossNumber.toString();
              window.location.assign("http://localhost:3000/battle")
            }

          }
          el = document.getElementById("portal");
          el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
          window.scrollTo(0, 0);

    }

  }
