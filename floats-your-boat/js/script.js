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

    generateString();

	function generateString() {
        Array.prototype.randomElement = function () {
            return this[Math.floor(Math.random() * this.length)];
        };

        randomPhrase = stringList.randomElement();
        console.log(randomPhrase);

        var sentenceString = "Hey, whatever <code>" + randomPhrase[0] + "</code> your <code>" + randomPhrase[1] + "</code>!";
        var sentence = randomPhrase[0] + " your " + randomPhrase[1];
        console.log(sentence);
        $("#sentence").html("<a href=\"http://www.google.com/search?q="+sentence+"\">" + sentenceString + "</a>");
        if (clickCount > 2) {
            $("#explanation").html("Don't understand? Click on the sentence for an explanation.");
        }
    }

    $('#generate').on('click', function() {
		generateString();
        clickCount++;
	});

});
