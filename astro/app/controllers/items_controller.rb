class ItemsController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    @item = Item.new(item_params)
    if @item.save
      render plain: "successful"
    else
      render plain: "unsuccessful"
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

  private
    def set_item
      @item = Item.find(params[:item][:id])
    end


    def item_params
      params.require(:item).permit(:item_type, :mainstat_name, :secondarystat_name, :equipped, :mainstat, :secondarystat, :owner)
    end
end
