var images = [ "images/puzzle_0.png",
			   "images/puzzle_1.png",
			   "images/puzzle_2.png",
			   "images/puzzle_3.png",
			   "images/puzzle_4.png",
			   "images/puzzle_5.png",
			   "images/puzzle_6.png",
			   "images/puzzle_7.png"];

row = function(val) {
	return Math.floor(val / 3);	
};

col = function(val) {
	return Math.floor(val % 3);	
};

movePiece = function(cId, oId, dir) {
	var img = $(document.getElementById(cId)).children('img').eq(0);

	$(document.getElementById(cId)).empty();
	$(document.getElementById(cId)).addClass('open');
	
	$(document.getElementById(oId)).append(img);
	$(document.getElementById(oId)).removeClass('open');

	switch(dir) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
	};
};

shuffle = function() {
	console.log("Shuffle pieces");
	
	var i = 0;

	var arr = []
	
	while(arr.length < 8)
	{
		var randomnumber=Math.floor(Math.random()*8)
		var found=false;
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i]==randomnumber)
			{
				found=true;
				break;
			}
		}
		
		if(!found) 
		{
			arr[arr.length]=randomnumber;
		}
	}

	for (var i = 0; i < arr.length; i++)
	{
		$(document.getElementById(i)).children('img').eq(0).attr('src', images[arr[i]]);
	}
};

findRemaining = function() {
	var remaining = [];

	for (var row = 0; row < 3; row++)
	{
		for (var col = 0; col < 3; col++)
		{
			var i = 3 * row + col;
			
			// get the image in the position i
			var src = $(document.getElementById(i)).children('img').eq(0).attr('src');
			
			if (src !== images[i])
			{
				remaining.push(i);
			}
		}
	}

	console.log(remaining);
};

checkForVictory = function() {
	var correctBlank = false;
	var correctCount = 0;

	for (var i = 0; i < 9; i++)
	{
		var src = $(document.getElementById(i)).children('img').eq(0).attr('src');
		
		if (i === 8) // check last is blank
		{
			if (typeof src === "undefined")
			{
				correctBlank = true;
			}
		}
		else if (src === images[i])
		{
			correctCount++;
		}
	}

	console.log("Correct Blank: " + correctBlank);
	console.log("Correct Count: " + correctCount);
	console.log("Correct Count: " + (correctCount === 8) + "\n");

	return (correctBlank && (correctCount === 8));
};

$(document).ready(function() {
	shuffle();

	$('#dropdownMenu1').click(function() {
		//$(this).addClass('blueTest');
	});

    $('td').click(function() {
    	var clickedSpot = $(this).attr('id');
		var openSpot = $('.open').attr('id');

		var oRow = row(openSpot);
		var oCol = col(openSpot);
		
		var cRow = row(clickedSpot);
		var cCol = col(clickedSpot);

		if (((cRow) === oRow) && ((cCol-1) === oCol))
		{
			movePiece(clickedSpot, openSpot, 0);
		}
		else if (((cRow) === oRow) && ((cCol+1) === oCol))
		{
			movePiece(clickedSpot, openSpot, 1);
		}
		else if (((cRow-1) === oRow) && ((cCol) === oCol))
		{
			movePiece(clickedSpot, openSpot, 2);
		}
		else if (((cRow+1) === oRow) && ((cCol) === oCol))
		{
			movePiece(clickedSpot, openSpot, 3);
		}

		var winner = checkForVictory();

		if (winner) {
			console.log("WINNER");
		}
    });

    $('#shuffle').click(function() {
		var remainingPuzzle = findRemaining();
    });    
});