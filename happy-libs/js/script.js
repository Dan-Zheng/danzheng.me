/* jshint -W004, -W033, -W116 */
/*
	TO DO:
	- Make droppable work for collision, not centers
	- Add point system/timing system for more fun (must finish level in given time or lose, give option to restart)
	- Fix sort/unsort position (problem with jQuery height, might not represent actual viewport)

	DONE:
	- Find better way to display sort and unsort divs
*/

$(document).ready(function() {

    var numberOfSentences = 1;
    var randomPhrase;
    var clickCount = 0;
    var stringList = ["alpha",
				 "beta",
				 "gamma",
				 "delta",
				 "epsilon",
				 "zeta",
				 "eta",
				 "theta",
				 "iota",
				 "kappa",
				 "lambda",
				 "mu",
				 "nu",
				 "xi",
				 "omicron",
				 "pi",
				 "rho",
				 "sigma",
				 "tau",
				 "upsilon",
				 "phi",
				 "chi",
				 "psi",
				 "omega"
 	]

    init();

    function init() {
        var maxOpacity = 1.0,
            minOpacity = 0.2;

        for (var i = 0; i < numberOfSentences; i++) {
			$("#sentence-display").append($("<h3 class='section-text' id='sentence" + i + "' style='display: none;'></h3>"));
            var temp = maxOpacity - i / (numberOfSentences - 1) * (maxOpacity - minOpacity)
            console.log("#sentence" + i + " opacity: " + temp);
			$('#sentence' + i).animate({'opacity': temp},1200);
		}

        $("#sentence-display").show();
    }

	function generateString() {
        Array.prototype.randomElement = function () {
            return this[Math.floor(Math.random() * this.length)];
        };

        randomPhrase = stringList.randomElement();
        console.log(randomPhrase);

        $("#sentence0").html(randomPhrase);

        if (clickCount === 1) {
            $("#sentence-counter").html(clickCount + " word generated.");
        } else {
            $("#sentence-counter").html(clickCount + " words generated.");
        }
        for (var j = 0; j < numberOfSentences; j++) {
            if (clickCount >= j) {
                $("#sentence" + j).show();
            }
        }
        if (clickCount > 100) {
            $("#sentence-counter").append(" That's too many.");
        } else if (clickCount > 80) {
            $("#sentence-counter").append(" That's a lot.");
        } else if (clickCount > 60) {
            $("#sentence-counter").append(" Woah.");
        } else if (clickCount > 40) {
            $("#sentence-counter").append(" Gosh.");
        } else if (clickCount > 20) {
            $("#sentence-counter").append(" Wow.");
        }
    }

    function shiftString() {
        for (var k = numberOfSentences - 1; k >= 1; k--) {
            $("#sentence" + k).html($("#sentence" + (k-1)).html());
        }
    }

    $('#generate').on('click', function() {
        clickCount++;
        shiftString();
		generateString();
        $("#sentence").show();
	});

});
