class EnemiesController < ApplicationController
  before_action :set_enemy, only: [:show, :edit, :update, :destroy]
  protect_from_forgery with: :null_session
  # GET /enemies
  # GET /enemies.json
  def index
    @enemies = Enemy.find_by(name: params[:name])
    render json: @enemies
  end

  # POST /enemies
  # POST /enemies.json
  def create
    @enemy = Enemy.new(enemy_params)

    if @enemy.save
      render plain: "successful"
    else
      render plain: "unsuccessful"
    end
  end

  # PATCH/PUT /enemies/1
  # PATCH/PUT /enemies/1.json
  def update

    if @enemy.update(enemy_params)
      render plain: "successful"
    else
      render plain: "unsuccessful"
    end
  end

  # DELETE /enemies/1
  # DELETE /enemies/1.json
  def destroy
    @enemy.destroy
      render plain: "successful"
  end

  private
    def set_enemy
      @enemy = Enemy.find(params[:id])
    end

    def enemy_params
      params.require(:enemy).permit(:name, :power, :health)
    end
end
