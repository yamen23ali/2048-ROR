class WelcomeController < ApplicationController
  def index

  end

  def create
  	test=10
  	render :index , :locals => {:f => test}
  end
end
