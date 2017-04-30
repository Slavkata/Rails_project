class GamesController < ApplicationController
  before_action :authenticate_user!, :except => [:setposdata, :getposdata]
  protect_from_forgery with: :null_session

  def index
    js :user => authenticate_user!.email
  end

  def getposdata
    @data = Game.all
    render json: @data.last
  end

  def setposdata
    @data = Game.new
    @data.square_x_pos = params[:square_x_pos]
    @data.square_y_pos = params[:square_y_pos]
    @data.circle_x_pos = params[:circle_x_pos]
    @data.circle_y_pos = params[:circle_y_pos]
    @data.index = params[:index]
    @data.save
    render json: @data
  end

end
