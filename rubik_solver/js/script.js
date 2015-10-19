/* Daniel Zheng
 * 16 Oct 2015
 * Rubik solver scramble demo
 */

(function() {
    var start, progressHandle;

    var cube = new Cube();

    var progress = function() {
        // add dot to represent progress
        $('#status').text(function(index, text) { return text + '.'; });
    };

    var initialized = function() {
        // if finished loading stop adding dots
        clearInterval(progressHandle);

        var end = new Date,
            duration = (end - start) / 1000;
        $('#status').text('Initialization done in ' + duration + ' seconds.');

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
            console.log(s);
            var urlOne = "http://cube.crider.co.uk/visualcube.png?size=300&alg=" + s;
            console.log(urlOne);
            var urlTwo = "http://cube.crider.co.uk/visualcube.png?size=300&r=y225x34z180&alg=" + s;
            console.log(urlTwo);
            $('#randomState .resultText').html(alg);
            $('#randomState .result').html("(Front view):<br><img src=\"" + urlOne + "\">" + "<br>(Back view):<br><img src=\"" + urlTwo + "\">");
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
        $('#randomState .result').html("(Front view):<br><img src=\"" + urlOne + "\">" + "<br>(Back view):<br><img src=\"" + urlTwo + "\">");
        };

    var formatString = function(algString) {
        var result = '';
        /*if (algString.indexOf(' ', algString.length) !== -1) {
          algString = algString.slice(0,-1);
        }*/
        var moveBasic = ['U', 'D', 'F', 'B', 'L', 'R', 'u', 'd', 'f', 'b', 'l', 'r'];
        var moveModify = ['2', '\'']
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
              //console.log('the char ' + algString[i] + ' has been found');
          }
        }
        return result;
    };

    $(function() {
        $('#status').text('Initializing');

        // begin measuring time
        start = new Date;

        // begin adding dots
        progressHandle = setInterval(progress, 1000);

        // async precomputing
        Cube.asyncInit('cubejs/lib/worker.js', initialized);
    });
})();
