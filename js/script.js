$(document).ready(function(){

	var palette = ['#69D2E7','#A7DBD8','#F38630','#FA6900','#fe4365','#fc9d9a','#f9cdad','#556270','#4ecdc4','#c7f464','#ff6b6b','#c44d58','#d1e751','#ffffff','#4dbce9','#26ade4','#d95b43','#c02942','#542437','#53777a','#cff09e','#a8dba8','#79bd9a','#3b8686','#0b486b','#00a0b0','#6a4a3c','#cc333f','#eb6841','#edc951']

	// Will hold colors for gradient.
	var color = [];
	// Number of blocks
	var numberOfBlocks = 5;
	//randomNumber used to make random tiles. USED WITH UNSORT
	var randomNumber = numberOfBlocks - 2;
	//Used to check players guess against actual
	var playerGuess = ["#FF0088", "#0088ff"];
	//Scores
	var roundScore = 0;
	var totalScore = 0;

	makeBoard();

	function makeBoard(colorStop){
		numberOfBlocks = totalScore + 3;
		randomNumber = numberOfBlocks - 2;
		//Holds color-stops in a gradient
		var colorStop = [palette[randomInt(palette.length - 1)], palette[randomInt(palette.length - 1)]];
		color = [];
		if (totalScore > 0){
			for (var i = 0; i < numberOfBlocks; i++) {
				$('#' + i).remove();
				$('#' + (100+i)).remove();
			}
		}
		for (var i = 0; i < randomNumber; i++) {
			$("#unsort").append($("<div class='unsort tile' id='" + i + "'></div>"));
			$('#' + i).animate({'opacity': .8},1200);
		}

		for (var i = 0; i < (numberOfBlocks); i++){
			$("#sort").append("<div class='sort tile drop' id='" + (i + 100) + "'></div>");
			$('#' + (100 + i)).animate({'opacity': 1},500);
		}

		for(var i = 1; i <= (randomNumber); i++){
			color.push($.xcolor.gradientlevel(colorStop[0], colorStop[1], i, numberOfBlocks).toHex());
		}

		console.log(color);

		$('#100').css('background-color', colorStop[0]);
		$('#100').removeClass("drop");

		$('#' + (100 + (numberOfBlocks - 1))).css('background-color',colorStop[1]);
		$('#' + (100 + (numberOfBlocks - 1))).removeClass('drop');

		//Deck will be shuffled
		var tempColor = color.slice();
		var deck = shuffle(color);
		color = tempColor;

		for(var i = 0; i < (randomNumber); i++){
			$("#"+i).css('background-color',deck[i]);
		}

		$(".unsort").draggable();
		$(".sort").droppable({
			drop: function(event,ui,numberOfBlocks){
				console.log(color)
				console.log($(this));
				console.log(color);
				console.log(color[($(this).attr('id') - 101)]);
				var rgb = $('#'+$(ui.draggable).attr('id')).css('background-color');
				console.log( toHex(rgb) );
				if(color[($(this).attr('id') - 101)] == toHex($('#'+$(ui.draggable).attr('id')).css('background-color')) ){
					$(this).css('background-color',color[($(this).attr('id') - 101)]);
					$(ui.draggable).fadeOut(300);
					roundScore++;
					if(roundScore == (randomNumber)){
						console.log(randomNumber);
						$('#win').fadeIn(500);
						totalScore++;
						roundScore = 0;
						$("#score").replaceWith("<div id='score'>Level: " + totalScore + "</div><div id='ng_con' class='game game-con'><div id='ng' class='game game-mess'>New Game</div>");
					}
				} else{
					$(ui.draggable).animate({'top':'-=50'},50);
				}
			}
		});
	}

	/*
	 * CSS stuff (position)
	 *
	*/
	function resize(numberOfBlocks, board){
		var win_y = $(window).height();
		var win_x = $(window).width();

		var border = 10;

		if (randomNumber > 6){
			var board_width = win_x * .9;
		} else {
			var board_width = win_x * (randomNumber/7);
		}
		var tile_s = (board_width - border) / numberOfBlocks - border;
		var board_height = tile_s + 2 * border;
		var margin_left = -board_width / 2;

		$('#'+board).css({
			"width": board_width + "px",
			"height": board_height + "px",
			"margin-left": margin_left + "px"
		});

		$('.tile.'+board).css({
			"width": tile_s,
			"height": tile_s,
			"margin-left": border,
			"margin-top": border,
			"margin-bottom": border
		});
	}

	setInterval(function() {resize(numberOfBlocks, 'sort')}, 100);
	setInterval(function() {resize(randomNumber, 'unsort')}, 100);

	/*
	 * Extension of styles
	*/
	$('.game').mousedown(function(event){
		$(this).css('background-color','#2277ee');
	});

	$('.game').mouseup(function(event){
		$(this).css('background-color','#3388FF');
		makeBoard();
		$("#win").fadeOut(500);
	});


	/*
	 * Fischer-Yates shuffle
	*/
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there are remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	//Function to convert hex format to a rgb color
	function toHex(rgb) {
	 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	 return (rgb && rgb.length === 4) ? "#" +
	  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
	}

	function randomInt(n) {
		return Math.floor(Math.random() * n);
	}

});
