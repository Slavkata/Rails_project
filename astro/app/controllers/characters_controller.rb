class CharactersController < ApplicationController

  def create
    if !Character.exists?(:name => params[:name])
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
      render json: Character.find_by(owner: params[:user])
    else
      render json: {"owner" => 0, "inGame" => 0}
    end
  end

  def deleteAcharacter
    @del = Character.find_by(:name => params[:name])
    if @del != [] then
      @del.destroy
    end
    @del = Item.where(:owner => params[:name])
    if @del != [] then
      @del.destroy
    end
    render plain: "OK"
  end

  def getAllC
    render json: Character.all
  end

end
