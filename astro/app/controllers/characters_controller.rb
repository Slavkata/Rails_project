class CharactersController < ApplicationController

  def create
    if !Character.exists?(name: params[:name])
      @char = Character.new
      @char.name = params[:name]
      @char.owner = params[:user]
      @char.save
      render json: @char
    else
      render plain: ""
    end
  end

  def showStats
    if Character.exists?(:owner => params[:user])
      @stats = Character.where(name: params[:name])
      render json: @stats
    else
      render json: {"name" => 0}
    end
  end

  def doesHave
    if Character.exists?(:owner => params[:user])
      render json: {"data" => 1}
    else
      render json: {"data" => 0}
    end
  end
end
