class ItemsController < ApplicationController

  def create
    if !Item.exists(owner: params[:character])
      @item = Item.new
      @item.type = params[:type]
      @item.mainstat_name = params[:mainstat_name]
      @item.secondarystat_name = params[:secondarystat_name]
      @item.mainstat = params[:mainstat]
      @item.secondarystat = params[:secondarystat]
      @item.equipped = false
      @item.owner = params[:character]
      @item.save
      render json: @item
    end
      render plain: ""
  end

  def getAll
    @allItems = Item.all
    render json: @allItems
  end

end
