Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessision: "users/sessision"
  }
  root to: "root#index"
  get "/game" => "games#index", as: "game"
  get "/getposdata" => "games#getposdata", as: "getposdata"
  post "/setposdata" => "games#setposdata", as: "setposdata"

  mount ActionCable.server => '/cable'
end
