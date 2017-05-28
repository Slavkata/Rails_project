class ItemsController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    if !Item.exists?(:owner => params[:character])
        json_params = JSON.parse(item.to_json)
        @item = Item.new(json_params)
        @item.save
        render json: @item
    else
      render plain: ""
    end
  end

  def getAll
    @userItems = Item.where(:owner => params[:owner])
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
