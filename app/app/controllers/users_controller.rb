class UsersController < ApplicationController
  def new
    @state = params[:state].to_i
    @user = User.new
  end

  def create
    @user = User.new
    if !User.exists?(username: params[:user][:username], email: params[:user][:email]) then
        if params[:user][:username] != "" && params[:user][:email] != "" && params[:user][:password] != "" then
          @user.username = params[:user][:username]
          @user.password = params[:user][:password]
          @user.email = params[:user][:email]
          @user.save
          render "signed"
        else
          redirect_to "/signup=1"
      end
    else
      redirect_to "/signup=2"
    end
  end

  def signed
    @user = User.where(params[:user][:username])
  end

  def login
    @state = params[:state]
  end

  def Login
    if User.exists?(username: params[:user][:username], password: params[:user][:password])
        redirect_to "/game"
    else
      @state = 1
      redirect_to "/login=#{@state}"
    end
  end
end
