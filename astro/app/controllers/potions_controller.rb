class PotionsController < ApplicationController
  before_action :set_potion, only: [:show, :edit, :update, :destroy]
  protect_from_forgery with: :null_session
  # GET /potions
  # GET /potions.json
  def index
    @potions = Potion.where(owner: params[:owner])
    render json: @potions
  end

  def showPotion
    @potions = Potion.where("owner = ? AND used = ?", params[:owner], 1)
    render json: @potions
  end

  # POST /potions
  # POST /potions.json
  def create
    @potion = Potion.new(potion_params)

    if @potion.save
      render plain: "successful"
    else
      render plain: "unsuccessful"
    end
  end

  # PATCH/PUT /potions/1
  # PATCH/PUT /potions/1.json
  def update
    if @potion.update(potion_params)
      render plain: "successful"
    else
      render plain: "unsuccessful"
    end
  end

  # DELETE /potions/1
  # DELETE /potions/1.json
  def destroy
    @potion.destroy
    render plain: "potion destroyed"
  end

  private
    def set_potion
      @potion = Potion.find(params[:potion][:id])
    end

    def potion_params
      params.require(:potion).permit(:name, :bonus_power, :bonus_health, :owner, :used)
    end
end
