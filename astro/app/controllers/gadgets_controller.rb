class GadgetsController < ApplicationController
  before_action :set_gadget, only: [:show, :edit, :update, :destroy]

  # GET /gadgets
  # GET /gadgets.json
  def index
    @gadgets = Gadget.where(owner: params[:owner])
    render json: @gadgets
  end

  def showGadget
    @gadgets = Gadget.where(owner: params[:owner]).find_by(equipped: 1)
    render json: @gadgets
  end

  # POST /gadgets
  # POST /gadgets.json
  def create
    @gadget = Gadget.new(gadget_params)
    if @gadget.save
      render plain: "successful"
    else
      render plain: "unsuccessful"
    end
  end

  # PATCH/PUT /gadgets/1
  # PATCH/PUT /gadgets/1.json
  def update
    if @gadget.upddate(gadget_params)
      render plain: "successful"
    else
      render plain: "unseccessful"
    end
  end

  # DELETE /gadgets/1
  # DELETE /gadgets/1.json
  def destroy
    @gadget.destroy
    render plain: "successful"
  end

  private
    def set_gadget
      @gadget = Gadget.find(params[:id])
    end

    def gadget_params
      params.require(:gadget).permit(:name.string, :owner.string, :bonus_health.integer, :bonus_power.integer, :equipped.integer)
    end
end
