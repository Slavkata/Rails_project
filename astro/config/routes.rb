Rails.application.routes.draw do

  get '/getGadgets' => 'gadgets#index', as: 'gadgets'
  post  '/newGadget' => 'gadgets#create', as: 'addGadget'
  get '/getBoss' => 'enemies#index', as: 'bossStat'
  post '/newBoss' => 'enemies#create', as: 'addBoss'
  get '/battle' => "battles#index", as: 'battle'
  get '/getGadget' => 'gadgets#showGadget', as: 'showGadget'
  put '/updateGadgets' => 'gadgets#update', as: 'updateGadgets'

  get '/getUsedPotion' => 'potions#showPotion', as: 'showCurrentPotion'
  get '/getPotions' => 'potions#index', as: 'getPotions'
  post '/newPotion' => 'potions#create', as: 'addPotion'
  put '/updatePotions' => 'potions#update', as: 'updatePotions'

  resources :shop_items
  devise_for :users, controllers: {
    sessision: "users/sessision"
  }
  root to: "root#index"
  get "/game" => "games#index", as: "game"
  get "/getposdata" => "games#getposdata", as: "getposdata"
  post "/setposdata" => "games#setposdata", as: "setposdata"
  get "/showStats" => "characters#showStats", as: "character_stats"
  post "/newCharacter" => "characters#create", as: "new_character"
  get "/getAll" => "items#getAll", as: "get_all_items"
  post "/addItem" => "items#create", as: "add_item"
  post "/defaultItems" => "items#defaultItems", as: "default_items"
  get "/doesHave" => "characters#doesHave", as: "name_check"
  get "/deleteAcharacter" => "characters#deleteAcharacter", as: "delete"
  get "/getAllC" => "characters#getAllC", as: "getC"
  mount ActionCable.server => '/cable'
end
