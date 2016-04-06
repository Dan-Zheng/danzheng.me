/* Daniel Zheng
 * 16 Oct 2015
 * Rubik solver scramble demo
 * TO DO: FIND A WAY TO DUMP PHP IMAGES
 */

$(document).ready(function() {
    var startTime, progressHandle;
    var lastAlgorithm = [];
    var moves = [];
    var future = [];
    var useHistory = true;
    var isLooping = false;
    var cube = new Cube();

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
        Cube.initSolver();

        var endTime = new Date(),
            duration = (endTime - startTime) / 1000;
        $('#status').text('Done! (' + duration + ' seconds)');

        // visualize scramble
        // $('#result').css('visibility', 'visible');
        // $('#randomState').css('visibility', 'visible');
        $('#randomState').show();
        $('#result').hide();
        $('#start').on('click', start);
        $('#scramble').on('click', generateScramble);
        $('#solve').on('click', function() {
            solve();
            changeResultText();
            $('#resultText').hide();
            makeImage();
        });
        $('#undo').on('click', function() {
            undo();
        });
        $('#redo').on('click', function() {
            redo();
        });
        $('#doAlg').on('click', function() {
            var stringToUse = $('input[id=algInput]').val();
            cube = new Cube();
            cube.move(stringToUse);
            console.log(cube.asString());
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
            twist(this.value);
        });
    };

    var start = function() {
        // hide status
        $('#status').hide();
        $('#solution').hide();
        $('#start').hide();

        // show algorithm textbox and buttons
        $('#result').css({"display":"flex"});
        $('#algText').show();
        $('#scramble').show();
        $('#solve').show();
        $('#undo').show();
        $('#redo').show();
        $('#algMoves').show();
        changeResultText();
        makeImage();
    };

    var generateScramble = function() {
        // hide status
        $('#status').hide();
        $('#solution').hide();

        // show algorithm textbox and buttons
        $('#algText').show();
        $('#algMoves').show();

        // make a scramble
        Cube.asyncScramble(function(alg) {
            lastAlgorithm = stringToArray(alg);
            console.log(alg);
            cube = new Cube();
            cube.move(alg);
            moves = [];
            history = [];
            changeResultText();
            makeImage();
        });
    };

    var solve = function() {
        if (!cube.isSolved()) {
            // hide status
            $('#status').hide();

            // show algorithm textbox and button
            $('#result').css({"display":"flex"});
            $('#algText').show();
            $('#algMoves').show();
            $('#solution').show();

            // solve
            var solution = cube.solve();
            $('#solution').html("Cube solution: <span class=\"algorithm\">" + solution + "</span>");
            console.log("cube solution: " + solution);
            cube.move(solution);
            lastAlgorithm = "";
            moves = [];
        }
    };

    var twist = function(value) {
        moves.push(value);
        cube.move(value);
        console.log(cube.asString());
        future = [];
        showMoves();
        makeImage();
    }

    var undo = function() {
        if (moves.length) {
            var move = moves.pop();
            future.unshift(move);
            console.log("future: " + future)
            showMoves();
            makeImage();
            return move;
        }
    }

    var doMove = function() {
        console.log("future: " + future)
        if (future.length) {
            var move = future.shift();
            if (useHistory) {
                moves.push(move);
            }
            showMoves();
            makeImage();
            return move;
        } else if (isLooping) {
            future = moves.slice();
            moves = [];
            showMoves();
            makeImage();
        }
    }

    var redo = function() {
        return doMove();
    }

    var empty = function(emptyHistory) {
        future = [];
        if (emptyHistory) {
            moves = [];
        }
    }

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
        $('#resultText').show();
        $('#resultText').html("Last Algorithm: <span class=\"algorithm\">" + newResultText + "</span>");
    };

    var makeImage = function() {
        var stringOne = arrayToString(lastAlgorithm).replace(/\s+/g, '');
        var stringTwo = arrayToString(moves).replace(/\s+/g, '');
        var string = stringOne + stringTwo;
        //var height = $(window).height -
        var urlOne = "../visualcube/visualcube.php?fmt=svg&size=300&bg=t&alg=" + string;
        //var urlTwo = "../visualcube/visualcube.php?fmt=svg&size=300&bg=t&r=y225x-34&alg=" + string;
        var urlTwo = "../visualcube/visualcube.php?fmt=svg&size=300&bg=t&r=y225x34z180&alg=" + string;
        //var urlOne = "http://cube.crider.co.uk/visualcube.php?fmt=png&size=300&bg=t&alg=" + string;
        //var urlTwo = "http://cube.crider.co.uk/visualcube.php?fmt=png&size=300&bg=t&r=y225x34z180&alg=" + string;

        $('#resultFront').html("(Front view):<br><img src=\"" + urlOne + "\">");
        $('#resultBack').html("(Back view):<br><img src=\"" + urlTwo + "\">");
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
        $('#solution').hide();
        $('#lastMoves').html("Moves: <span class=\"algorithm\">" + arrayToString(moves) + "</span>");
        $('#lastMoves').show();
    };

    var moveInverse = function(move) {
        if (move.indexOf('\'') !== -1) {
            move = move.slice(0, -1);
        } else if (move.indexOf('2' === -1)) {
            move = move + '\'';
        }
        return move;
    };

    Array.prototype.randomElement = function () {
        return this[Math.floor(Math.random() * this.length)];
    };

    // Keyboard listener
    window.onkeyup = function(e) {
        if (e.target.tagName.toLowerCase() !== 'input' &&
            e.target.tagName.toLowerCase() !== 'textarea') {
            //var key = e.keyCode ? e.keyCode : e.which;
            var key = String.fromCharCode(e.which);
            if ('RrLlUuDdFfBb'.indexOf( key ) >= 0) {
                var move;
                if (e.shiftKey) {
                    move = key + "\'";
                } else {
                    move = key;
                }
                console.log(move);
                twist(move);
            }
        }
    };

    $(function() {
        $('.tlt').textillate({
            minDisplayTime: 1500,
            initialDelay: 500,
            in: { effect: 'fadeInLeft', sync: false },
            //out :{  delay: 3, effect: 'fadeOutDown', sync: true},
            loop: false
        });

        $('#status').text('Loading');

        // begin measuring time
        startTime = new Date();

        // begin adding dots
        progressHandle = setInterval(progress, 500);

        // async precomputing
        Cube.asyncInit('cubejs/lib/worker.js', initialized);
    });
});
