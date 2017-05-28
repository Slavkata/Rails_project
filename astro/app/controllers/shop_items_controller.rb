class ShopItemsController < ApplicationController
  before_action :set_shop_item, only: [:show, :edit, :update, :destroy]

  # GET /shop_items
  # GET /shop_items.json
  def index
    @shop_items = ShopItem.all
    render json: @shop_items
  end

  # POST /shop_items
  # POST /shop_items.json
  def create
    @shop_item = ShopItem.new(shop_item_params)

    if @shop_item.save
      render plain: "successful"
    else
      render plain: "unsuccessful"
    end
  end

  # PATCH/PUT /shop_items/1
  # PATCH/PUT /shop_items/1.json
  def update
    if @shop_item.update(shop_item_params)
      render plain: "successful"
    else
      render plain: "unsuccessful"
    end
  end

  # DELETE /shop_items/1
  # DELETE /shop_items/1.json
  def destroy
    @shop_item.destroy
    render plain: "successful"
  end

  private
    def set_shop_item
      @shop_item = ShopItem.find(params[:id])
    end

    def shop_item_params
      params.require(:shop_item).permit(:name, :type, :mainstat, :secondarystat, :mainstat_name, :secondarystat_name, :price)
    end
end
