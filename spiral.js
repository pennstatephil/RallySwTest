/* spiral.js
* by: Phil Hurwitz
* purpose: make a neat spiral up to a number.
* output goes into a table with id 'output'.
* REQUIRES: jQuery
*/


//takes a number as a string, does a couple sanity checks,
//then populates a 2d array with the spiraling numbers
//and automatically sends to output function when done
function makeSpiral(strNum) {
	var number = parseInt(strNum);
	if(isNaN(number))
	{
		alert("Nice try! Enter a number...");
	}
	else if(number<0)
	{
		alert("Nice try! Try a positive number...");
	}
	else
	{
		//the size of the square is the ceiling of the square root (+1 because we include 0)
		var squareSize = Math.ceil(Math.sqrt(number+1));

		//make a 2-d array of appropriate size
		var arr = new Array(squareSize+1);
		for(var a=0; a<arr.length; a++)
		{
			arr[a] = new Array(squareSize+1);
		}

		//starting point (for 0) is the floor of half the size
		var row, col;
		row = Math.floor(squareSize/2);
		col = Math.floor(squareSize/2);

		//directions for the row/col to move in
		var rowDir=0, colDir=1;
		//the distance from the center point
		var dist=1;
		//the current length of the piece
		var currLength=0; 

		//build the array
		for(var i=0; i<=number; i++)
		{
			//if you want to debug...
			//console.log(i+' '+row+' '+col);
			
			//fill the space
			arr[row][col] = i;
			//move to the next one
			row+=rowDir;
			col+=colDir;

			currLength++;
			if(currLength == dist)
			{
				//done with this part
				currLength = 0;

				//change direction
				var tmp = rowDir;
				rowDir = colDir;
				colDir = -tmp;

				//if rowDir is 0, time to increase the distance
				if(rowDir==0)
				{
					dist++;
				}
			}
		}

		//send it to output
		out(arr);
	}
}

//make sure you have a table with id output!
function out(arr)
{
	var out = [];
	for(var i = 0; i < arr.length; i++)
	{
		out.push("<tr>\n\t");
		for(var j = 0; j < arr[i].length; j++)
		{
			out.push("<td>"+ (!isNaN(arr[i][j]) ? arr[i][j] : '') +"</td>");
		}
		out.push("\n</tr>\n")
	}
	//out with the old
	$("#output").empty();
	//...and in with the new!
	$("#output").append(out.join(''));
}