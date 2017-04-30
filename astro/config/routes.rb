Rails.application.routes.draw do
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
  get "/doesHave" => "characters#doesHave", as: "name_check"

  mount ActionCable.server => '/cable'
end
