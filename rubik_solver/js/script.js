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

        // make random pattern algorithm in input
        var algList = ["F B2 R’ D2 B R U D’ R L’ D’ F’ R2 D F2 B’",
                       "U2 D2 F2 B2 L2 R2",
                       "U F B’ L2 U2 L2 F’ B U2 L2 U",
                       "R2 L’ D F2 R’ D’ R’ L U’ D R D B2 R’ U D2",
                       "F L F U’ R U F2 L2 U’ L’ B D’ B’ L2 U",
                       "U’ L’ U’ F’ R2 B’ R F U B2 U B’ L U’ F U R F’",
                       "L U B’ U’ R L’ B R’ F B’ D R D’ F’",
                       "U D’ R L’ F B’ U D’",
                       "F R’ U L F’ L’ F U’ R U L’ U’ L F’",
                       "F B2 R’ D2 B R U D’ R L’ D’ F’ R2 D F2 B’ U D’ R L’ F B’ U D’"
                    ];
        $('input[id=algInput]').val(algList.randomElement());
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

        console.log(algString);
        algString = algString.replace(/\s+/g, ''); // remove spaces
        console.log(algString);
        algString = algString.replace(/\u2019+/g, '\''); // replace utf8 right quotation with ASCII quotation
        console.log(algString);

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

    Array.prototype.randomElement = function () {
        return this[Math.floor(Math.random() * this.length)];
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
