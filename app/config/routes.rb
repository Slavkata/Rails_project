Rails.application.routes.draw do
  post "/signup=:state" => "users#create"
  get "/signup=:state" => "users#new", as: "sign"
  get "/signed" => "users#signed", as: "signed"
  get "/login=:state" => "users#login", as: "login"
  post "/login=:state" => "users#Login"
  get "/" => "roots#index", as: "root"
  get "/events" => "events#index", as: "events"
  get "/shop" => "shops#index", as: "shop"
  get "/faq" => "faqs#index", as: "faq"
  get "/about" => "abouts#index", as: "about"
  get "/game" => "games#index", as: "game"
end
