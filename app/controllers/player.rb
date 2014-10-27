require "cell.rb"

class Player

	#======= Members
	attr_accessor :board
	attr_accessor :move_result # 1:win , 0 : playing , -1 : lose
	#======= Members

	#======= Initialize
	def initialize
		@board=Hash.new 
		(0..6).each{ |i|
			(0..6).each{ |j|
				@board[[i,j]]=Cell.new(0,0,"")
			}
		}
		#==== intitial cells
		@board[[1,1]].value=2
		@board[[2,3]].value=4
		@move_result=0
	end
	#======= Initialize

	#====== Move One Cell
	def move_cell(row,col,direction)
		new_row=row
		new_col=col
		current_value=@board[[row,col]].value
		#return if it's an empty cell
		if current_value==0
			return 0
		end

		#==== Find new Cell

		if direction==1  #========= Move left
			counter=col-1
			while true
				temp_value=@board[[row,counter]].value
				
				break if ( counter==0 || (temp_value!=0 && temp_value!=current_value))
				new_col=counter
				if temp_value==current_value
					current_value=current_value*2
					break
				else
					counter=counter-1
				end
				
			end
		elsif direction==2 #========= Move right
		    counter=col+1
			while true
				temp_value=@board[[row,counter]].value
				break if ( counter==5 || (temp_value!=0 && temp_value!=current_value))
				new_col=counter

				if temp_value==current_value	
					current_value=current_value*2
					break
				else
					counter=counter+1
				end
			end
		elsif direction==3 #========= Move up
			counter=row-1
			while true
				temp_value=@board[[counter,col]].value
				break if ( counter==0 || (temp_value!=0 && temp_value!=current_value))
				new_row=counter

				if temp_value==current_value	
					current_value=current_value*2
					break
				else
					counter=counter-1
				end
			end
		else #========= Move down
			counter=row+1
			while true
				temp_value=@board[[counter,col]].value
				break if ( counter==5 || (temp_value!=0 && temp_value!=current_value))
				new_row=counter

				if temp_value==current_value	
					current_value=current_value*2
					break
				else
					counter=counter+1
				end
			end
		end

		#===== Chnage The Values
		if (new_row==row && new_col==col)
			return 0
		end

		@cell_moved=true

		@board[[new_row,new_col]].old_value=@board[[new_row,new_col]].value
		@board[[new_row,new_col]].value=current_value

		@board[[row,col]].old_value=@board[[row,col]].value
		@board[[row,col]].value=0

		if current_value == 2048
			@move_result=1
		end

	end
	#====== Move One Cell


	#======= Make a move
	def make_move(direction)
		
		if direction==1  #========= Move left
			(1..4).each{|i|
				(2..4).each{|j|
					move_cell(i,j,direction)
				}
			}
		elsif direction==2 #========= Move right
			(1..4).each{|i|
				3.downto(1).each{|j|
					move_cell(i,j,direction)
				}
			}
		elsif direction==3 #========= Move up
			(1..4).each{|j|
				(2..4).each{|i|
					move_cell(i,j,direction)
				}
			}
		else #========= Move down
			(1..4).each{|j|
				3.downto(1){|i|
					move_cell(i,j,direction)
				}
			}
		end

		add_new_cell
		
	end
	#======= Make a move

	#======= Add New Cell 
	def add_new_cell

		#==== find empty cells
		empty_cells=[]
		(1..4).each{|i|
			(1..4).each{ |j|
				if(@board[[i,j]].value==0)
					empty_cells << {"row"=>i,"col"=>j} 
				end
			}

		}

	  #===== losing condition 
	  if !@cell_moved && empty_cells.length==0
	  	@move_result=-1
	  	return 0
	  end
	  #===== Generating new cell condition
	  return 0 if !@cell_moved
	  #===== get random cell
	  random=Random.new 
	  selected_cell=empty_cells[random.rand(empty_cells.length)]
	  
	  #====== get random number ( 2 or 4 ) to place in the random cell
	   value=2;
	   if(random.rand(1.0)>0.5)
			value=4;
	  end
	  #======= fill our random cell with our random number
	  @board[[selected_cell["row"],selected_cell["col"]]].value=value

	  @cell_moved=false;	
	end
	#======= Add New Cell

end
