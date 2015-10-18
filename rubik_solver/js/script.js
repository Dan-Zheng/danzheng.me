/* cubejs demo
 * dan zheng
 * it's october 7 i think
 * it's october 8 now
 * here we go
 * hurray
 */

(function() {
    var start, progressHandle;

    var progress = function() {
        // add dot
        $('#status').text(function(index, text) { return text + '.'; });
    };

    var initialized = function() {
        // if finished loading stop adding dots
        clearInterval(progressHandle);

        var end = new Date,
            duration = (end - start) / 1000;
        $('#status').text('Initialization done in ' + duration + ' seconds.');

        // visualize scrambler
        $('#randomstate').css('visibility', 'visible');
        $('#randomstate button').on('click', generateScramble);
    };

    var generateScramble = function() {
        // hide status
        $('#status').hide();

        // make a scramble
        Cube.asyncScramble(function(alg) {
            var s = alg.replace(/\s+/g, ''),  // remove spaces
                url = "http://cube.crider.co.uk/visualcube.png?size=500&alg=" + s;
            $('#randomstate .result').html(alg + "<br><img src=\"" + url + "\">");
        });
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
