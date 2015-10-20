/* jshint -W004, -W033 */
/*
	TO DO:
	- Make droppable work for collision, not centers
	- Add point system/timing system for more fun (must finish level in given time or lose, give option to restart)
	- Fix sort/unsort position (problem with jQuery height, might not represent actual viewport)

	DONE:
	- Find better way to display sort and unsort divs
*/

$(document).ready(function() {

	var palette = ['#69d2e7','#a7dbd8','#f38630','#fa6900','#fe4365','#fc9d9a','#f9cdad','#556270','#4ecdc4','#c7f464','#ff6b6b','#c44d58','#d1e751','#000000','#4dbce9','#26ade4','#d95b43','#c02942','#542437','#53777a','#cff09e','#a8dba8','#79bd9a','#3b8686','#0b486b','#00a0b0','#6a4a3c','#cc333f','#eb6841','#edc951'];

	var messagesGood = ["Nice.",
					"Good job.",
					"Keep it up.",
					"Hurray.",
					"Yay.",
					"Way to go.",
					"Good work.",
					"Not bad.",
					"Wow.",
					"Awesome.",
					"Wonderful.",
					"Splendid."
				];

	var messagesBad = ["Bzzzt.",
					"Derp.",
					"No.",
					"Nope.",
					"Not quite.",
					"Wrong.",
					"Incorrect.",
					"Fail."
				];

	// Will hold colors for gradient.
	var color = [];
	// Number of blocks
	var numberOfBlocks = 5;
	// unsortNumber used to make random tiles. USED WITH UNSORT
	var unsortNumber = numberOfBlocks - 2;
	// Used to check players guess against actual
	var playerGuess = [];
	// Scores
	var levelScore = 0;
	var totalScore = 0;
	var levelNumber = 1;

	makeBoard();

	function makeBoard(colorStop) {

		numberOfBlocks = totalScore + 3;
		unsortNumber = numberOfBlocks - 2;

		// Holds color-stops in a gradient
		do {
			var colorStop = [palette[randomInt(palette.length - 1)], palette[randomInt(palette.length - 1)]];
			console.log(colorStop);
			console.log($.xcolor.distance(colorStop[0], colorStop[1]));
		} while($.xcolor.distance(colorStop[0], colorStop[1]) < 130);

		color = [];

		if (totalScore > 0) {
			for (var i = 0; i < numberOfBlocks; i++) {
				$('#' + i).remove();
				$('#' + (100+i)).remove();
			}
		}

		for (var i = 0; i < unsortNumber; i++) {
			$("#unsort").append($("<div class='unsort tile' id='" + i + "'></div>"));
			$('#' + i).animate({'opacity': 0.8},1200);
		}

		for (var i = 0; i < (numberOfBlocks); i++) {
			$("#sort").append("<div class='sort tile drop' id='" + (i + 100) + "'></div>");
			$('#' + (100 + i)).animate({'opacity': 1},500);
		}

		for (var i = 1; i <= (unsortNumber); i++) {
			color.push($.xcolor.gradientlevel(colorStop[0], colorStop[1], i, numberOfBlocks).getHex());
		}

		$('#100').css('background-color', colorStop[0]);
		$('#100').removeClass("drop");

		$('#' + (100 + (numberOfBlocks - 1))).css('background-color',colorStop[1]);
		$('#' + (100 + (numberOfBlocks - 1))).removeClass('drop');

		// Deck will be shuffled
		var tempColor = color.slice();
		var deck = shuffle(color);
		color = tempColor;

		for (var i = 0; i < (unsortNumber); i++) {
			$("#"+i).css('background-color', deck[i]);
		}

		$("#level").html("Level: " + levelNumber);

		$(".unsort").draggable();
		$(".sort").droppable({
			drop: function(event,ui,numberOfBlocks) {
				console.log(color)
				//var rgb = $('#'+$(ui.draggable).attr('id')).css('background-color');
				//console.log(toHex(rgb));
				if (color[($(this).attr('id') - 101)] == toHex($('#'+$(ui.draggable).attr('id')).css('background-color'))) {
					levelScore++;
					$(this).css('background-color',color[($(this).attr('id') - 101)]);

					//THE LINE BELOW CONTROLS THE PROBLEM OF SHIFTING UNSORT
					//console.log($(ui.draggable).attr('id'));
					$(ui.draggable).css('visibility', 'hidden');
					//$(ui.draggable).css('z-index','-10'); // doesn't work
					//$(ui.draggable).hide(); // causes shifting in unsort

					if (levelScore == (unsortNumber)) {
						$('#level-win').hide();
			            $('#win-message').html(messagesGood.randomElement());
						//$('#win-message').css('visibility', 'visible');
						//$('#level-btn').css('visibility', 'visible');
						$('#level-btn').show();
						$('#level-win').fadeIn();
						$('.space-show').hide();
						$('.space-hide').show();
						$('#unsort').hide();
						totalScore++;
						levelScore = 0;
						levelNumber++;
					}
				} else {
					$(ui.draggable).animate({'opacity':'0.9'},0);
					$(ui.draggable).animate({'top':'-=15'},40);
					$(ui.draggable).animate({'top':'+=15'},40);
					$(ui.draggable).animate({'top':'-=15'},40);
					$(ui.draggable).animate({'top':'+=15'},40);
					$(ui.draggable).animate({'opacity':'1'},0);
					$('#level-btn').hide();
					$('#win-message').html(messagesBad.randomElement());
					$('#level-win').show();
				}
			}
		});
	}

	/*
	 * CSS stuff (position)
	*/
	function resize(numberOfBlocks, board){
		var winY = $(window).height();
		var winX = $(window).width();

		// var border = 5 - ((unsortNumber - 2) * 1.1);
		var border = 5;
		var boardWidth;
		var tileSide;

		// console.log('winX' + winX);
		// console.log('winY' + winY);
		
		if (winX < winY) {
			//console.log('case 1 x < y')
			boardWidth = winX * 0.9;
		} else {
			//console.log('case 2 x > y')
			boardWidth = winY * 0.9;
		}

		if (board == 'sort') {

		} else if (board == 'unsort') {
			boardWidth = boardWidth / (unsortNumber + 2) * unsortNumber;
			// console.log('unsort: ' + tileSide);
		}

		tileSide = ((boardWidth - border) / numberOfBlocks - border);

		var boardHeight = (tileSide + 2 * border); // double border
		var marginLeft = -boardWidth / 2;

		$('#'+board).css( {
			"width": boardWidth + "px",
			"height": boardHeight + "px",
			"margin-left": marginLeft + "px"
		});

		$('.tile.'+board).css( {
			"width": tileSide,
			"height": tileSide,
			"margin-left": border,
			"margin-top": border,
			"margin-bottom": border
		});
		//console.log(board);
	}

	// setInterval time = refresh time, make 0 for instantaneous
	setInterval(function() {resize(numberOfBlocks, 'sort')}, 100);
	setInterval(function() {resize(unsortNumber, 'unsort')}, 100);

	$('#level-btn').on('click', function() {
		makeBoard();
		$('.space-show').show();
		$('.space-hide').hide();
		$('#unsort').show();
		$("#level").html("Level: " + levelNumber);
		$('#level-win').hide();
		//$('#level-btn').css('visibility', 'hidden');
		//$('#win-message').css('visibility', 'hidden');
	});

	function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }

	Array.prototype.randomElement = function () {
        return this[Math.floor(Math.random() * this.length)];
    };

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

	/* Converts color from RGB format to hex
	 * @param rgb string storing color in RGB format
	 * @return hex string storing color in hex format
	 */
	function toHex(rgb) {
	 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	 return (rgb && rgb.length === 4) ? "#" +
	  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
	}

	/* Generates random integer between 0 to n - 1
	 * @return integer between 0 to n - 1, inclusive
	 */
	function randomInt(n) {
		return Math.floor(Math.random() * n);
	}

});
