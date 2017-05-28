class BattlesController < ApplicationController
  before_action :authenticate_user!
  def index
    if !Character.where(owner: authenticate_user!.email).find_by(name: params[:char]).nil?
      js :character => params[:char]
      js :enemy => params[:enemy]
      js :user => authenticate_user!.email
    else
      render plain: "Error 404 Character not found"
    end
  end
end
