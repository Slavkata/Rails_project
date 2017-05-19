class ShopItemsController < ApplicationController
  before_action :set_shop_item, only: [:show, :edit, :update, :destroy]

  # GET /shop_items
  # GET /shop_items.json
  def index
    @shop_items = ShopItem.all
    render json: @shop_items
  end

  # GET /shop_items/1
  # GET /shop_items/1.json
  def show
  end

  # GET /shop_items/new
  def new
    @shop_item = ShopItem.new
  end

  # GET /shop_items/1/edit
  def edit
  end

  # POST /shop_items
  # POST /shop_items.json
  def create
    @shop_item = ShopItem.new(shop_item_params)

    respond_to do |format|
      if @shop_item.save
        format.html { redirect_to @shop_item, notice: 'Shop item was successfully created.' }
        format.json { render :show, status: :created, location: @shop_item }
      else
        format.html { render :new }
        format.json { render json: @shop_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /shop_items/1
  # PATCH/PUT /shop_items/1.json
  def update
    respond_to do |format|
      if @shop_item.update(shop_item_params)
        format.html { redirect_to @shop_item, notice: 'Shop item was successfully updated.' }
        format.json { render :show, status: :ok, location: @shop_item }
      else
        format.html { render :edit }
        format.json { render json: @shop_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shop_items/1
  # DELETE /shop_items/1.json
  def destroy
    @shop_item.destroy
    respond_to do |format|
      format.html { redirect_to shop_items_url, notice: 'Shop item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shop_item
      @shop_item = ShopItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def shop_item_params
      params.require(:shop_item).permit(:name, :type, :mainstat, :secondarystat, :mainstat_name, :secondarystat_name, :price)
    end
end
