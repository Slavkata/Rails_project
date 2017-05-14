class GamesController < ApplicationController
  before_action :authenticate_user!, :except => [:setposdata, :getposdata]
  protect_from_forgery with: :null_session

  def index
    js :user => authenticate_user!.email
  end

  def getposdata
    @data = Game.all
    if !@data.last.nil?
      render json: @data.last
    else
        render json: {
                        "square_x_pos" => 1100,
                        "square_y_pos" => 400,
                        "circle_x_pos" => 100,
                        "circle_y_pos" => 400,
                        "index" => 0,
                        "owner" => authenticate_user!.email,
                        "inGame" => 1
                     }
    end
  end

  def setposdata
    @data = Game.all.destroy if !Game.last.nil?
    @data = Game.new
    @data.square_x_pos = params[:square_x_pos] if !params[:square_x_pos].nil?
    @data.square_y_pos = params[:square_y_pos] if !params[:square_y_pos].nil?
    @data.circle_x_pos = params[:circle_x_pos] if !params[:circle_x_pos].nil?
    @data.circle_y_pos = params[:circle_y_pos] if !params[:circle_y_pos].nil?
    @data.index = params[:index] if !params[:index].nil?
    @data.owner = params[:owner] if !params[:owner].nil?
    @data.inGame = params[:inGame] if params[:inGame].nil?
    @data.save
    render json: @data
  end
end
