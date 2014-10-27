/*
* An Object Of This Class Will Represent A Cell In The Board
* @param value : the current value of the cell
* @param oldValue : the previous value of the cell
* @param id : the id of the cell
*/

function Cell(id,value,oldValue)
{
	//============== Members ============//
	this.value=value;
	this.oldValue=oldValue;
	this.id=id;
	//============== Members ============//
	
	//============== Methods ============//
	/*
	* Clear Current cell  values
	*/
	this.clear=function(){
		this.value=0;
		this.oldValue=0;
	}
	//============== Methods ============//
}