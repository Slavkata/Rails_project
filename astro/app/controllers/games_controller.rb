class GamesController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session

  def index
  end
end
