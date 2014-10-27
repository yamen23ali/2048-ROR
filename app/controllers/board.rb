require "cell.rb"

class Player

	#======= Members
	attr_accessor :value
	attr_accessor :old_value
	attr_accessor :id
	#======= Members

	#======= Initialize
	def initialize(value,old_value,id)
		@value=value
		@old_value=@old_value
		@id=id
	end
	#======= Initialize

	#======= Clear Cell 
	def clear
		@value=0
		@old_value=0
	end
	#======= Clear Cell
end
