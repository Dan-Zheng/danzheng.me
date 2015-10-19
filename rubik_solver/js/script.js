/* Daniel Zheng
 * 16 Oct 2015
 * Rubik solver scramble demo
 * TO DO: FIND A WAY TO DUMP PHP IMAGES
 */

(function() {
    var start, progressHandle;

    var progress = function() {
        // add dot to represent progress
        $('#status').text(function(index, text) {
            if(text.slice(-3) == '...') {
                return text.slice(0, -3);
            } else {
                return text + '.';
            }
        });
    };

    var initialized = function() {
        // if finished loading stop adding dots
        clearInterval(progressHandle);

        var end = new Date(),
            duration = (end - start) / 1000;
        $('#status').text('Done! (' + duration + ' seconds)');

        // visualize scramble
        $('#randomState').css('visibility', 'visible');
        $('#scramble').on('click', generateScramble);
        $('#doAlg').on('click', doAlg);
    };

    var generateScramble = function() {
        // hide status
        $('#status').hide();

        // show algorithm textbox and button
        $('#algText').css('visibility', 'visible');
        $('#doAlg').css('visibility', 'visible');

        // make a scramble
        Cube.asyncScramble(function(alg) {
            var s = alg.replace(/\s+/g, '');  // remove spaces
            var urlOne = "http://cube.crider.co.uk/visualcube.png?size=300&alg=" + s;
            var urlTwo = "http://cube.crider.co.uk/visualcube.png?size=300&r=y225x34z180&alg=" + s;
            $('#randomState .resultText').html(alg);
            $('#randomState .resultFront').html("<br>(Front view):<br><img src=\"" + urlOne + "\">" + "<br>");
            $('#randomState .resultBack').html("<br>(Back view):<br><img src=\"" + urlTwo + "\">" + "<br><br>");
        });
    };

    var doAlg = function() {
        // console.log($('#algInput')[0].value);
        // perform moves in the move box
        var algo = formatString($('#algInput')[0].value);
        var algSpaceless = algo.replace(/\s+/g, ''); // remove spaces
        var urlOne = "http://cube.crider.co.uk/visualcube.png?size=300&alg=" + algSpaceless;
        var urlTwo = "http://cube.crider.co.uk/visualcube.png?size=300&r=y225x34z180&alg=" + algSpaceless;
        $('#randomState .resultText').html(algo);
        $('#randomState .resultFront').html("<br>(Front view):<br><img src=\"" + urlOne + "\">" + "<br>");
        $('#randomState .resultBack').html("<br>(Back view):<br><img src=\"" + urlTwo + "\">" + "<br><br>");
    };

    var formatString = function(algString) {
        var result = '';
        var moveBasic = ['U', 'D', 'F', 'B', 'L', 'R', 'u', 'd', 'f', 'b', 'l', 'r'];
        var moveModify = ['2', '\''];

        algString = algString.replace(/\s+/g, ''); // remove spaces

        var i = 0;
        while (i < algString.length) {
            if (moveBasic.indexOf(algString[i]) != -1) {
                if (i < algString.length - 1 && moveModify.indexOf(algString[i+1]) != -1) {
                    result = result + ' ' + algString.slice(i,i+2) + ' ';
                    i += 2;
                } else {
                    result = result + ' ' + algString[i];
                    i += 1;
                }
            }
        }
        return result;
    };

    $(function() {
        $('#status').text('Loading');

        // begin measuring time
        start = new Date();

        // begin adding dots
        progressHandle = setInterval(progress, 500);

        // async precomputing
        Cube.asyncInit('cubejs/lib/worker.js', initialized);
    });
})();
