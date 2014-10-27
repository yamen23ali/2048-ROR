/*
* An Object Of This Class Will Control The 2048 Game
*/
function GameController()
{
	//============== Members ============//
	//=== initialize board contents
	var score=0;
	var board=new Array(6);
	this.movedCells=0;
	var self=this;
	this.border="10px"; // to change the cell style ( circle , square)
	//============== Members ============//
	
	//============== Methods ==============//
	
	//==============================//
	/*
	* Initialize the board content to start the game
	*/
	this.initializeBoard=function(){
		var counter=1;
		
		// initialize the board and its boundry
		for(var i=0;i<=6;i++){
			board[i]=new Array(6);
			for(var j=0;j<=6;j++){
				board[i][j]=new Cell("",0,0);
			}
		}
		
		// fill cells id
		for(var i=1;i<=4;i++){
			for(var j=1;j<=4;j++){
				board[i][j].id="c"+(counter++);
			}
		}
		
		// intitial cells
		board[1][1].value=2;
		board[2][3].value=4;
		
		score=0;
		this.movedCells=0;
	}
	//==============================//
	
	
	//==============================//
	/*
	* Rebuild The game board with the new values generated agter moving the cells
	*/
	this.reBuild=function(){
		this.movedCells--;
		if(this.movedCells==0){ // hold the rebuild of the board till all cells moves
			for(var i=1;i<=4;i++){
				for(var j=1;j<=4;j++){
					var id='#'+board[i][j].id;
					var value=board[i][j].value;
					if(value!=0){ // if cell is not empty
					    var valueStyle=value;
						if(value>2048) 
							valueStyle=2048;
						$(id).empty();
						$(id).append('<div class="tile num'+valueStyle+'">'+value+'</div>');
						if(board[i][j].oldValue==(value/2)){ // if 2 cells are merged
							$(id+" :first-child").fadeIn(100).fadeOut(100).fadeIn(100); // make some effect when cells are merged
							board[i][j].oldValue=value;
							this.changeScore(value);
						}
					}
					else
						$(id).empty();
				 }
			}
			//==== after finishing from rebuilding add new nummber to the board
			this.addNewNumber();
			$('.tile').css("border-radius",this.border); // just for styling
		}
	}

	
	
	
	//==============================//
	/*
	* Animate the cell grapically
	* @param id : cell id we want to animate
	* @param direction: in which direction we want to animate
	* @param blocksNum : how many block (cell ) to animate the cell
	*/
	this.animateCell=function(id,direction,blocksNum){
	   
	   var blockSize=121.25;  // block size in pixels
	   var sign="+=";
	   if(direction==1 || direction==3)
		sign="-=";
		
	   var distance=sign+blocksNum*blockSize+"px"; // this will look like this for exapmle ( "-=223.435px")
	   
	   if(direction==1 || direction==2){
		 $(id+" :first-child").animate({'marginLeft': distance},80,function() {self.reBuild();} );
	   }
	   else{
		 $(id+" :first-child").animate({'marginTop': distance},80,function() {self.reBuild();});
	   }
	}
	//==============================//
	
	//==============================//
	/*
	* Get The New Position where we can place the cell 
	*@param row : the row of the cell we want to move
	*@param col : the col of the cell we want to move
	*@param direction : the direction we want to move the cell in
	*/
	
	 this.getNewPosition=function(row,col,direction){
		var blocksNum=0;
		var currentVal=board[row][col].value;
		var newPos=new Position(0,0,0,currentVal);
		//=================== Move Left
		if(direction==1)  {
			for(var i=col-1;i>=1;i--){
				 //=== if we hit a none empty cell stop moving
				if(board[row][i].value>0 && board[row][i].value!=currentVal) 
					break;
				newPos=new Position(row,i,++blocksNum,currentVal);
				//===== if we hit an existing cell with value same to our current one
				if(board[row][i].value==currentVal){
					newPos.value=board[row][i].value+currentVal;
					break;
				}
			}
		}
		//=================== Move Right
		else if(direction==2)  {
			for(var i=col+1;i<=4;i++){
				//=== if we hit a none empty cell stop moving
				if(board[row][i].value>0 && board[row][i].value!=currentVal) 
					break;
				//===== if we hit an existing cell with value same to our current one
				newPos=new Position(row,i,++blocksNum,currentVal);
				if(board[row][i].value==currentVal){
					newPos.value=board[row][i].value+currentVal;
					break;
				}
			}
		}
		//=================== Move Up
		else if(direction==3)  {
			for(var i=row-1;i>=1;i--){
				//=== if we hit a none empty cell stop moving
				if(board[i][col].value>0 && board[i][col].value!=currentVal) 
					break;
				//===== if we hit an existing cell with value same to our current one
				newPos=new Position(i,col,++blocksNum,currentVal);
				if(board[i][col].value==currentVal){
					newPos.value=board[i][col].value+currentVal;
					break;
				}
			}
		}
		//=================== Move Down
		else if(direction==4)  {
			for(var i=row+1;i<=4;i++){
				//=== if we hit a none empty cell stop moving
				if(board[i][col].value>0 && board[i][col].value!=currentVal) 
					break;
				//===== if we hit an existing cell with value same to our current one
				newPos=new Position(i,col,++blocksNum,currentVal);
				if(board[i][col].value==currentVal){
					newPos.value=board[i][col].value+currentVal;
					break;
				}
			}
		}
		return newPos;
	}
	//==============================//
	
	
	//==============================//
	/*
	* Move single cell from the board in the wanted direction
	* @param direction : where we want to move the cells ( 1 : left , 2 : right , 3 : up , 4 : down ) 
	* @param row : the cell row
	* @param column : the cell column
	*/
	//==============================//
	this.moveCell=function(direction,row,column){
    
		var currentCell=board[row][column];
		
		//====== if cell is empty don't move it
		if(currentCell.value==0) return;
		
		//====== get the new position of the cell
		var position=this.getNewPosition(row,column,direction);
				
		//====== if we can move the cell
		if(position.blocks>0 )
		{
			this.movedCells++;
			var newCell=board[position.row][position.column];
			
			//==== move cell graphically 
			this.animateCell('#'+currentCell.id ,direction,position.blocks);				
			//==== change cell in the new position values
			newCell.oldValue=newCell.value;
			newCell.value=currentCell.value;
			//====== in case we merge current cell with the one in the new position
			if(position.value!=currentCell.value)
				newCell.value=position.value;
			
				
			currentCell.clear();
		}
	}

	
	//==============================//
	/*
	* Move the board cells in the wanted direction , we move cells one by one ,
	* the movment start always from the boundry of the board , the way we move ( which cells to move first ) depends on the direction
	* @param direction : where we want to move the cells ( 1 : left , 2 : right , 3 : up , 4 : down ) 
	*/
	 this.moveCells=function(direction){
		//=================== Move Left
		if(direction==1) {
			for(var i=2;i<=4;i++){
				for(var j=1;j<=4;j++){
					this.moveCell(direction,j,i);
				}
			}
		}
		//=================== Move Right
		if(direction==2){
			for(var i=3;i>=1;i--){
				for(var j=1;j<=4;j++){
					this.moveCell(direction,j,i);
				}
			}
		}
		//=================== Move Up
		if(direction==3){
			for(var i=2;i<=4;i++){
				for(var j=1;j<=4;j++){
					this.moveCell(direction,i,j);
				}
			}
		}
		//=================== Move Down
		if(direction==4){
			for(var i=3;i>=1;i--){
				for(var j=1;j<=4;j++){
					this.moveCell(direction,i,j);
				}
			}
		}
	}
	//==============================//
	
	//==============================//
	/*
	* Get random number between min and max ( [min,max])
	* @param min : the min number of the range
	* @param max : the max number of the range 
	* @return : a random number
	*/
	this.getRandomInt=function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	//==============================//
	
	//==============================//
	/*
	* Add new random number ( 2 or 4 ) in a random empty cell in the board
	*/
	this.addNewNumber=function(){
		//=== get all empty cells in the board , help us to choose random one of them
		var emptyCells=new Array(); 
		for(var i=1;i<=4;i++){
			for(var j=1;j<=4;j++){
			   if(board[i][j].value==0){
				 var temp={row:i,col:j,id:board[i][j].id};
				 emptyCells.push(temp);
			   }
			}
	    }
	   
	   //====== if there is no more empty cells quit
	   if(emptyCells.length==0) 
		return ;
		//===== get random cell
	   var chosen=emptyCells[this.getRandomInt(0,emptyCells.length-1)];
	   //====== get random number ( 2 or 4 ) to place in the random cell
	   var value=2;
	   if(Math.random()>0.5)
			value=4;
	   //======= fill our random cell with our random number
	   board[chosen.row][chosen.col].value=value;
	   $('#'+chosen.id).append('<div class="tile num'+value+'">'+value+'</div>');
	   
	   	if(this.checkResult()==false)
				alert("You Lose");
	}
	//==============================//
	
	//==============================//
	/*
	* Change the player score each time 2 cells are merged
	* @param value : the value to add to score
	*/
	this.changeScore=function(value){
		score+=value;
		$('#score').text("Score :"+score);
	}
	//==============================//
	
	
	//==============================//
	/*
	* Check To see if any moves still available for the player or the game has ended
	*/
	this.checkResult=function(){
		for(var i=1;i<=4;i++){
			for(var j=1;j<=4;j++){
				var value=board[i][j].value;
				if(value==0) 
					return true; // check if it's empty cell
				if(value==board[i][j-1].value || value==board[i][j+1].value ||  // check if any move is available
					value==board[i-1][j].value || value==board[i+1][j].value)
					return true;
			}
		}
		return false;
		
	}
	//==============================//

	//============== Methods ==============//
	
	
	
}