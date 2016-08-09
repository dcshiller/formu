class StaticPagesController < ApplicationController

  def root
    @currentUser = currentUser

  end

end
