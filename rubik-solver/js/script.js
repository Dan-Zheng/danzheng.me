/* Daniel Zheng
 * 16 Oct 2015
 * Rubik solver scramble demo
 * TO DO: FIND A WAY TO DUMP PHP IMAGES
 */

(function() {
    var start, progressHandle;

    var cubeTest = function() {
        var cube = new Cube();
        console.log(cube.asString());
        //cube.move("F");
        cube.move("F B2 R' D2 B R U D' R L' D' F' R2 D F2 B' U D' R L' F B' U D'");

        Cube.initSolver();
        var result = cube.solve();
        cube.move(cube.solve());

        console.log(cube.asString());

        if (cube.isSolved()) {
            console.log("the cube is solved");
            console.log(result);
        } else {
            console.log("the cube is not solved");
        }
    };

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
        // $('#result').css('visibility', 'visible');
        // $('#randomState').css('visibility', 'visible');
        $('#randomState').show();
        $('.result').hide();
        $('#scramble').on('click', generateScramble);
        $('#doAlg').on('click', doAlg);
        $('#genAlg').on('click', function() {
            // make random pattern algorithm in input
            var algList = ["F B2 R' D2 B R U D' R L' D' F' R2 D F2 B'",
                           "U2 D2 F2 B2 L2 R2",
                           "U F B' L2 U2 L2 F' B U2 L2 U",
                           "R2 L' D F2 R' D' R' L U' D R D B2 R' U D2",
                           "F L F U' R U F2 L2 U' L' B D' B' L2 U",
                           "U' L' U' F' R2 B' R F U B2 U B' L U' F U R F'",
                           "L U B' U' R L' B R' F B' D R D' F'",
                           "U D' R L' F B' U D'",
                           "F R' U L F' L' F U' R U L' U' L F'",
                           "U F2 B2 L R F B' U D R U F2 U2 F2 L2 R2 U2 B2 D L2 R2 B2"
                        ];
            $('input[id=algInput]').val(algList.randomElement());
        });
    };

    var generateScramble = function() {
        // hide status
        $('#status').hide();

        // show algorithm textbox and button
        $('.result').css({"display":"flex"});
        $('#algText').show();

        // make a scramble
        Cube.asyncScramble(function(alg) {
            makeImage(alg);
        });
    };

    var doAlg = function() {
        // perform moves in the move box
        var alg = formatString($('#algInput')[0].value);
        makeImage(alg);
    };

    var makeImage = function(alg) {
        var algSpaceless = alg.replace(/\s+/g, ''); // remove spaces
        var urlOne = "../visualcube/visualcube.php?fmt=png&size=300&bg=t&alg=" + algSpaceless;
        var urlTwo = "../visualcube/visualcube.php?fmt=png&size=300&bg=t&r=y225x34z180&alg=" + algSpaceless;
        //var urlOne = "http://cube.crider.co.uk/visualcube.png?size=300&bg=t&alg=" + algSpaceless;
        //var urlTwo = "http://cube.crider.co.uk/visualcube.png?size=300&bg=t&r=y225x34z180&alg=" + algSpaceless;
        $('#randomState .resultText').html("<b>" + alg + "</b>");
        $('#randomState .resultFront').html("(Front view):<br><img src=\"" + urlOne + "\">" + "");
        $('#randomState .resultBack').html("(Back view):<br><img src=\"" + urlTwo + "\">" + "");
    };

    var formatString = function(algString) {
        var result = '';
        var moveBasic = ['U', 'D', 'F', 'B', 'L', 'R', 'u', 'd', 'f', 'b', 'l', 'r'];
        var moveModify = ['2', '\''];

        algString = algString.replace(/\s+/g, ''); // remove spaces
        algString = algString.replace(/\u2019+/g, '\''); // replace utf8 right quotation with ASCII quotation

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
