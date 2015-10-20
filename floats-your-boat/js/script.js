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

    var randomPhrase;
    var clickCount = 0;
    var stringList = [["steams", "clams"],
        ["burps", "baby"],
        ["roasts", "chestnuts"],
        ["rolls", "socks up and down"],
        ["makes", "nose twitch"],
        ["squares", "root"],
        ["bounces", "superball"],
        ["climbs", "beanstalk"],
        ["trims", "shrubbery"],
        ["dunks", "donuts"],
        ["skims", "milk"],
        ["braises", "chicken"],
        ["whirls", "dervish"],
        ["pops", "weasel"],
        ["trickles", "troglodyte"],
        ["buttons", "cardigan"],
        ["pops", "bubble wrap"],
        ["tightens", "wingnut"],
        ["blackens", "catfish"],
        ["chokes", "throttle"],
        ["sweetens", "honey"],
        ["lubes", "chassis"],
        ["stuffs", "turkey"],
        ["makes", "parakeet tweet"],
        ["garnishes", "potato salad"],
        ["greases", "ball bearings"],
        ["restrains", "relative"],
        ["plucks", "poultry"],
        ["ages", "Camembert"],
        ["pins", "tail on donkey"],
        ["saddles", "pony"],
        ["staffs", "help desk"],
        ["churns", "butter"],
        ["twirls", "baton"],
        ["battens", "down hatches"]
    ];

    //init();
    //generateString();

    function init() {
        // console.log($("#sentence-display").height());
        // $(".pre-scrollable").css("height:",$(".section-space").height());
        // console.log($("#sentence").height());

    }

	function generateString() {
        Array.prototype.randomElement = function () {
            return this[Math.floor(Math.random() * this.length)];
        };

        randomPhrase = stringList.randomElement();
        console.log(randomPhrase);

        var sentenceString = "Hey, whatever <code>" + randomPhrase[0] + "</code> your <code>" + randomPhrase[1] + "</code>!";
        var sentence = randomPhrase[0] + " your " + randomPhrase[1];
        $("#sentence").html("<a href=\"http://www.google.com/search?q="+sentence+"\" target=\"_blank\">" + sentenceString + "</a>");

        if (clickCount === 1) {
            $("#sentence-counter").html(clickCount + " sentence generated.");
        } else {
            $("#sentence-counter").html(clickCount + " sentences generated.");
        }
        if (clickCount >= 2) {
            $("#sentence2").show();
        }
        if (clickCount >= 3) {
            $("#sentence3").show();
        }
        if (clickCount > 3) {
            $("#explanation").html("Don't understand? Click on a sentence for its explanation.");
            $("#explanation").fadeIn(700);
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
        $("#sentence3").html($("#sentence2").html());
        $("#sentence2").html($("#sentence").html());
    }

    $('#generate').on('click', function() {
        clickCount++;
        $("#sentence-display").show();
        shiftString();
		generateString();
        $("#sentence").show();
	});

});
