require "game.rb"
class GameController < ApplicationController
  
  def index
     @@game_status=0  # still playing =0 , game_over=1
  end

  def main
    #=== initialize and get id 
    if !defined?(@@game)
      @@game=Game.new
    end
    
    player_id=params[:id]
    @@game.add_player(player_id)
    #===== Render it
    render :locals => {:player_id=>player_id}
  end

  def move
    
    if @@game_status==0
      new_board=@@game.player_move(params[:id],params[:direction].to_i)
      
      if new_board["move_result"]==1
       @@game_status=1  
      end
    else
      new_board =Hash.new 
      new_board["move_result"]= -1
    end
    
    render :json =>new_board.to_json
  end
end
