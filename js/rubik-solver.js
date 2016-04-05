/* Daniel Zheng
 * 16 Oct 2015
 * Rubik solver scramble demo
 * TO DO: FIND A WAY TO DUMP PHP IMAGES
 */

$(document).ready(function() {
    var start, progressHandle;
    var lastAlgorithm = [];
    var moves = [];

    var cubeTest = function() {
        var cube = new Cube();
        console.log(cube.asString());
        //cube.move("F");
        cube.move("R");

        console.log(cube.toJSON());
        console.log(cube.asString());

        Cube.initSolver();
        var result = cube.solve();
        cube.move(cube.solve());

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
        //cubeTest();
        // if finished loading stop adding dots
        clearInterval(progressHandle);

        var end = new Date(),
            duration = (end - start) / 1000;
        $('#status').text('Done! (' + duration + ' seconds)');

        // visualize scramble
        // $('#result').css('visibility', 'visible');
        // $('#randomState').css('visibility', 'visible');
        $('#randomState').show();
        $('#result').hide();
        $('#scramble').on('click', generateScramble);
        $('#doAlg').on('click', function() {
            var stringToUse = $('input[id=algInput]').val();
            lastAlgorithm = stringToArray(stringToUse);
            moves = [];
            changeResultText();
            makeImage();
        });
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
        $('.alg-button').on('click', function() {
            moves.push(this.value);
            showMoves();
            makeImage();
        });
    };

    var generateScramble = function() {
        // hide status
        $('#status').hide();

        // show algorithm textbox and button
        $('#result').css({"display":"flex"});
        $('#algText').show();
        $('#algMoves').show();

        // make a scramble
        Cube.asyncScramble(function(alg) {
            lastAlgorithm = stringToArray(alg);
            moves = [];
            changeResultText();
            makeImage();
        });
    };

    var stringToArray = function(string) {
        var array = string.split(" ");
        return array;
    };

    var arrayToString = function(array) {
        var string = '';
        for (var i = 0; i < array.length; i++) {
            string = string + array[i] + ' ';
        }
        return string;
    };

    var changeResultText = function() {
        $('#lastMoves').hide();
        newResultText = arrayToString(lastAlgorithm);
        $('#resultText').html("Last Algorithm: " + newResultText);
    };

    var makeImage = function() {
        var stringOne = arrayToString(lastAlgorithm).replace(/\s+/g, '');
        var stringTwo = arrayToString(moves).replace(/\s+/g, '');
        var string = stringOne + stringTwo;
        var urlOne = "../visualcube/visualcube.php?fmt=png&size=300&bg=t&alg=" + string;
        var urlTwo = "../visualcube/visualcube.php?fmt=png&size=300&bg=t&r=y225x-34&alg=" + string;
        //var urlOne = "http://cube.crider.co.uk/visualcube.php?fmt=png&size=300&bg=t&alg=" + string;
        //var urlTwo = "http://cube.crider.co.uk/visualcube.php?fmt=png&size=300&bg=t&r=y225x34z180&alg=" + string;
        //console.log(urlOne);
        //console.log(urlTwo);

        $('#resultFront').html("(Front view):<br><img src=\"" + urlOne + "\">" + "");
        $('#resultBack').html("(Back view):<br><img src=\"" + urlTwo + "\">" + "");
    };

    var showMoves = function() {
        var checkAgain = true;
        while (checkAgain === true) {
            checkAgain = false;
            var index = moves.length - 1;

            // if more than one move has been performed
            if (index >= 1) {
                // if there is a duplicate single move
                if (moves[index-1] == moves[index] && moves[index-1].indexOf('2') == -1) {
                    console.log(moves[index-1] + " + " + moves[index] + " -> " + moves[index] + "2");
                    moves[index-1] = moves[index][0] + '2';
                    moves.pop();
                    checkAgain = true;
                // if a move is followed by its inverse
                } else if (moveInverse(moves[index-1]) == moves[index]) {
                    console.log(moves[index-1] + " + " + moves[index] + " -> " + "[]");
                    moves.pop();
                    moves.pop();
                    checkAgain = true;
                // if a double move is followed by a single move
                } else if (moves[index-1][0] == moves[index][0] && moves[index-1][1] == '2') {
                    console.log(moves[index-1] + " + " + moves[index] + " -> " + moveInverse(moves[index]));
                    moves[index-1] = moveInverse(moves[index]);
                    moves.pop();
                    checkAgain = true;
                }
            }
        }
        console.log(moves);
        $('#lastMoves').html('Moves: ' + arrayToString(moves));
        $('#lastMoves').show();
    };

    var moveInverse = function(move) {
        if (move.indexOf('\'') != -1) {
            move = move.slice(0, -1);
        } else if (move.indexOf('2' === -1)) {
            move = move + '\'';
        }
        return move;
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

        cubeTest();
    });
});
