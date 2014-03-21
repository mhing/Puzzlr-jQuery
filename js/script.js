var images = [ "images/puzzle_0.png",
			   "images/puzzle_1.png",
			   "images/puzzle_2.png",
			   "images/puzzle_3.png",
			   "images/puzzle_4.png",
			   "images/puzzle_5.png",
			   "images/puzzle_6.png",
			   "images/puzzle_7.png"];

var usedShuffle = false; // only 1 reshuffle per game

var movesTaken = 0;
var startTime = new Date();

var level = 3; // base level for 3x3
var levelScore = level * 100;

var maxBonus = 100000;

var totalPenalty = 0;
var penalty = 1000;

var totalScore = levelScore;

var wonGame = false;

calculateScoreBonus = function(timeTaken) {
	return (maxBonus / (timeTaken + movesTaken + (level * 10)));
};

calculateScore = function() {
	var finishTime = new Date();
	var timeElapsed = (finishTime - startTime) / 60000; // convert to min from milliseconds

	var bonus = Math.round(calculateScoreBonus(timeElapsed));
	
	console.log("Bonus: " + bonus + " Moves: " + movesTaken + " Penalty: " + totalPenalty);

	totalScore = levelScore + bonus - totalPenalty;

	if (totalScore < 0)
	{
		totalScore = 0;
	}

	$('#score').text("Score: " + totalScore);
};

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

	movesTaken++;

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

randomizeImages = function() {
	var arr = []
	
	while(arr.length < 8)
	{
		var randomnumber = Math.floor(Math.random() * 8)
		var found = false;
		for (var i = 0; i < arr.length; i++)
		{
			if(arr[i] == randomnumber)
			{
				found = true;
				break;
			}
		}
		
		if (!found) 
		{
			arr[arr.length] = randomnumber;
		}
	}

	return arr;
};

shuffle = function() {
	for (var i = 0; i < 9; i++)
	{
		$(document.getElementById(i)).empty();
	}

	var arr = randomizeImages();

	for (var i = 0; i < arr.length; i++)
	{
		$(document.getElementById(i)).append("<img/>");
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

	return remaining;
};

findSolved = function() {
	var solved = [];

	for (var row = 0; row < 3; row++)
	{
		for (var col = 0; col < 3; col++)
		{
			var i = 3 * row + col;
			
			// get the image in the position i
			var src = $(document.getElementById(i)).children('img').eq(0).attr('src');
			
			if (src === images[i])
			{
				solved.push(i);
			}
		}
	}

	return solved;
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

	return (correctBlank && (correctCount === 8));
};

winScreen = function() {
	console.log("Winner");
	wonGame = true;

	calculateScore();

	$('#winner-popup').show();
	$('#restart').text("New Game");
};

shuffleRemaining = function(pieces) {
	var remainingPuzzle = findRemaining();
	var solved = findSolved();

	var shuffled = [];

	while(shuffled.length < remainingPuzzle.length)
	{
		var randomnumber = Math.floor(Math.random() * remainingPuzzle.length)
		var found = false;

		for (var i = 0; i < shuffled.length; i++)
		{
			if(shuffled[i] == randomnumber)
			{
				found = true;
				break;
			}
		}
		
		if (!found) 
		{
			shuffled[shuffled.length] = randomnumber;
		}
	}

	console.log("Remaining: " + remainingPuzzle);
	console.log("Shuffled: " + shuffled);
	console.log("Solved: " + solved);

	var newImages = [];

	for (var i = 0; i < remainingPuzzle.length; i++)
	{
		newImages.push(remainingPuzzle[shuffled[i]]);
	}

	console.log("New Images: " + newImages);

	for (var i = 0; i < remainingPuzzle.length; i++)
	{
		$(document.getElementById(remainingPuzzle[i])).empty();
		$(document.getElementById(remainingPuzzle[i])).removeClass("open");
	}

	for (var i = 0; i < newImages.length; i++)
	{
		if (newImages[i] === 8)
		{
			$(document.getElementById(remainingPuzzle[i])).addClass("open");
		}
		else
		{
			$(document.getElementById(remainingPuzzle[i])).append("<img/>");
			$(document.getElementById(remainingPuzzle[i])).children('img').eq(0).attr('src', images[newImages[i]]);	
		}
	}

	movesTaken++; // count shuffle as a move
};

scorePenalty = function() {
	totalPenalty += penalty;
	console.log("Penalty: " + totalPenalty);
};

newGameSetup = function() {
	wonGame = false;
	$('#restart').text("Restart Game");
	$("#winner-popup").hide();
};


$(document).ready(function() {
	$('#dialog-instructions, #dialog-about').dialog({
		dialogClass: "no-close close-button",
		autoFocus: false,
		autoOpen: false,
		draggable: false,
		height: 500,
		width: 550,
		modal: true,
		buttons: [
			{
				text: "Close",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});

	$('#instructions').click(function() {
		$('#dialog-about').dialog("close");
		$('#dialog-instructions').dialog("open");
	});

	$('#about').click(function() {
		$('#dialog-instructions').dialog("close");
		$('#dialog-about').dialog("open");
	});

	$("#winner-popup").hide();
	startTime = new Date();

	console.log(startTime);

	shuffle();

    $('td').click(function() {
    	if (!wonGame)
    	{
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

			totalScore += 10;
			$('#score').text("Score: " + totalScore);

			var winner = checkForVictory();

			if (winner) {
				winScreen();
			}
		}
    });

    $('#shuffle').click(function() {
    	if (!usedShuffle)
    	{
	    	scorePenalty();
			shuffleRemaining();
			
			var winner = checkForVictory();

			if (winner) {
				winScreen();
			}

			usedShuffle = true;
			$('#shuffle').addClass('disabled');
		}
    }); 

	$('#restart').click(function() {
		if (wonGame)
		{
			newGameSetup();
		}
		
		startTime = new Date();

		totalScore = 0;
		totalPenalty = 0;

		usedShuffle = false;
		$('#shuffle').removeClass('disabled');

		for (var i = 0; i < 8; i++) // run through elements, reset open to id 8
		{
			$(document.getElementById(i)).removeClass('open');
			$(document.getElementById(i)).empty(); // remove all images
		}

		$(document.getElementById('8')).addClass('open');
		
		shuffle();
	}); 

	$('#win').click(function() {
		winScreen();
	});

});