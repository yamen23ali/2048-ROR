require "player.rb"
class Game

    #===== Members
    
	#===== Members
	
	#===== Initialize
	def initialize
		@players=Hash.new
	end
	#===== Initialize

	#===== Get Players Num
	def get_players_num
		return @players.length
	end
	#===== Get Players Num

	#===== Get Player
	def get_player(id)
		return @players[id]
	end
	#===== Get Player

	#===== Add Player
	def add_player(id)
		@players[id]=Player.new
	end
	#===== Add Player

	#===== Make Player Move
	def player_move(id,direction)
		@players[id].make_move(direction)

		res=Hash.new

		(1..4).each{|i|
			(1..4).each{|j|
				res[(i*10)+j]=@players[id].board[[i,j]].value
			}
		}

		res["move_result"]=@players[id].move_result

		return res
	end
	#===== Make Player Move

end
