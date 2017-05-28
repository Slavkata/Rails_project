Rails.application.routes.draw do

  get '/getGadgets' => 'gadgets#index', as: 'gadgets'
  post  '/newGadget' => 'gadgets#create', as: 'addGadget'
  get '/getGadget' => 'gadgets#showGadget', as: 'showGadget'
  put '/updateGadgets' => 'gadgets#update', as: 'updateGadgets'

  get '/getBoss' => 'enemies#index', as: 'bossStat'
  post '/newBoss' => 'enemies#create', as: 'addBoss'

  get '/battle/:char/:enemy' => "battles#index", as: 'battle'

  get '/getUsedPotion' => 'potions#showPotion', as: 'showCurrentPotion'
  get '/getPotions' => 'potions#index', as: 'getPotions'
  post '/newPotion' => 'potions#create', as: 'addPotion'
  put '/updatePotions' => 'potions#update', as: 'updatePotions'

  get '/getShopitems' => 'shop_items#index', as: 'allShop'
  post '/addShopitem' => 'shop_items#create', as: 'newShop'
  delete '/deleteShopitem' => 'shop_items#delete', as: 'removeShop'
  put '/updateShopitem' => 'shop_items#update', as: 'editShop'

  devise_for :users, controllers: {
    sessision: "users/sessision"
  }
  root to: "root#index"
  get "/game" => "games#index", as: "game"
  get "/getposdata" => "games#getposdata", as: "getposdata"
  post "/setposdata" => "games#setposdata", as: "setposdata"

  get "/showStats" => "characters#showStats", as: "character_stats"
  post "/newCharacter" => "characters#create", as: "new_character"
  get "/doesHave" => "characters#doesHave", as: "name_check"
  get "/deleteAcharacter" => "characters#deleteAcharacter", as: "delete"
  get "/getAllC" => "characters#getAllC", as: "getC"

  get "/getAll" => "items#getAll", as: "get_all_items"
  post "/addItem" => "items#create", as: "add_item"
  post "/defaultItems" => "items#defaultItems", as: "default_items"

  mount ActionCable.server => '/cable'
end
