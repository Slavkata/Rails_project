Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessision: "users/sessision"
  }
  root to: "root#index"
  get "/game" => "games#index", as: "game"

  mount ActionCable.server => '/cable'
end
