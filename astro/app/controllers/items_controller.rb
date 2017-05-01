class ItemsController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    if !Item.exists?(:owner => params[:character])
      @item = Item.new
      @item.type = params[:type]
      @item.mainstat_name = params[:mainstat_name]
      @item.secondarystat_name = params[:secondarystat_name]
      @item.mainstat = params[:mainstat]
      @item.secondarystat = params[:secondarystat]
      @item.owner = params[:character]
      @item.save
      render json: @item
    else
      render plain: ""
    end
  end

  def getAll
    @userItems = Item.where(:owner => params[:user])
    render json: @userItems
  end

  def defaultItems
    @items = params[:items]
    JSON.parse(@items.to_json).each do |item|
      @item = Item.new(item[1])
      @item.save
    end
    render plain: ""
  end
end
