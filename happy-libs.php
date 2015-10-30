<!DOCTYPE html>
<html>

<head>
    <title>Happy Libs</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href='terminal.ico'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='bower_components/font-awesome/css/font-awesome.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100.300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/header.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/fonts.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/happy-libs.css" type="text/stylesheet">

    <style>
        #tagged-text { display: none; }
        #tagged-title { display: none; }
        #tag { display: none }
    </style>

    <script type="text/javascript" src='bower_components/jquery/dist/jquery.min.js'></script>
    <script type="text/javascript" src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
    <script type="text/javascript" src="js/lexer.js"></script>
    <script type="text/javascript" src="js/lexicon.js"></script>
    <script type="text/javascript" src="js/POSTagger.js"></script>
    <script type="text/javascript" src='js/happy-libs-test.js'></script>
</head>

<?php include("header.php");?>

<body>
    <div class='container text-center' id='main'>
        <div class='row'>
            <div class='col-lg-12 text-center'>
                <h1 class='section-divider' id='title'>Happy Libs Generator</h1>
                <h3 class='section-divider' id='subtitle'>(Still a work in progress! Currently only identifies parts of speech.)</h3>
                <h2 class='section-divider'>Raw Input</h2>
                <input type='text' class='form-control input-lg section-divider' id='input-text' placeholder='Type sentence here:' value=''>
                </input>

                <div class='section-divider noselect'>
                    <button id='generate' type='button' class='btn btn-primary'>Generate</button>
                    <button id='tag-explain' type='button' class='btn btn-primary' data-toggle="modal" data-target="#tagModal">Show Tags</button>
                </div>

                <div class="modal fade" id="tagModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">Tag Explanations</h4>
                            </div>
                            <div class="modal-body">
                                <div class='row'>
                                    <div class='col-md-3'>
                                        <p>CC Coordinating conjunction</p>
                                        <p>NN Noun, sing. or mass</p>
                                        <p>CD Cardinal number</p>
                                        <p>NNS Noun, plural</p>
                                        <p>DT Determiner</p>
                                        <p>NNP Proper noun, sing.</p>
                                        <p>EX Existential there</p>
                                        <p>NNPS Proper noun, plural</p>
                                        <p>FW Foreign word</p>
                                        <p>PDT Predeterminer</p>
                                        <p>IN Preposition</p>
                                    </div>
                                    <div class='col-md-3'>
                                        <p>POS Possessive ending</p>
                                        <p>JJ Adjective</p>
                                        <p>PP Personal pronoun</p>
                                        <p>JJR Adj., comparative</p>
                                        <p>PP$ Possessive pronoun</p>
                                        <p>JJS Adj., superlative</p>
                                        <p>RB Adverb</p>
                                        <p>LS List item marker</p>
                                        <p>RBR Adverb, comparative</p>
                                        <p>MD Modal</p>
                                        <p>RBS Adverb, superlative</p>

                                    </div>
                                    <div class='col-md-3'>
                                        <p>RP Particle</p>
                                        <p>WP$ Possessive-Wh</p>
                                        <p>SYM Symbol</p>
                                        <p>WRB Wh-adverb</p>
                                        <p>TO "to"</p>
                                        <p>$ Dollar sign</p>
                                        <p>UH Interjection</p>
                                        <p># Pound sign</p>
                                        <p>VB verb, base form</p>
                                        <p>" quote</p>
                                        <p>VBD verb, past tense</p>

                                    </div>
                                    <div class='col-md-3'>
                                        <p>) Right paren</p>
                                        <p>VBP Verb, present</p>
                                        <p>, Comma</p>
                                        <p>VBZ Verb, present</p>
                                        <p>. Sent-final punct</p>
                                        <p>WDT Wh-determiner</p>
                                        <p>: Mid-sent punct.</p>
                                        <p>WP Wh pronoun</p>
                                        <p>VBG verb, gerund</p>
                                        <p>( Left paren</p>
                                        <p>VBN verb, past part</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='tag'>
                    <div class='col-md-3'>
                        <p>CC Coordinating conjunction</p>
                        <p>NN Noun, sing. or mass</p>
                        <p>CD Cardinal number</p>
                        <p>NNS Noun, plural</p>
                        <p>DT Determiner</p>
                        <p>NNP Proper noun, sing.</p>
                        <p>EX Existential there</p>
                        <p>NNPS Proper noun, plural</p>
                        <p>FW Foreign word</p>
                        <p>PDT Predeterminer</p>
                        <p>IN Preposition</p>
                    </div>
                    <div class='col-md-3'>
                        <p>POS Possessive ending</p>
                        <p>JJ Adjective</p>
                        <p>PP Personal pronoun</p>
                        <p>JJR Adj., comparative</p>
                        <p>PP$ Possessive pronoun</p>
                        <p>JJS Adj., superlative</p>
                        <p>RB Adverb</p>
                        <p>LS List item marker</p>
                        <p>RBR Adverb, comparative</p>
                        <p>MD Modal</p>
                        <p>RBS Adverb, superlative</p>

                    </div>
                    <div class='col-md-3'>
                        <p>RP Particle</p>
                        <p>WP$ Possessive-Wh</p>
                        <p>SYM Symbol</p>
                        <p>WRB Wh-adverb</p>
                        <p>TO "to"</p>
                        <p>$ Dollar sign</p>
                        <p>UH Interjection</p>
                        <p># Pound sign</p>
                        <p>VB verb, base form</p>
                        <p>" quote</p>
                        <p>VBD verb, past tense</p>

                    </div>
                    <div class='col-md-3'>
                        <p>) Right paren</p>
                        <p>VBP Verb, present</p>
                        <p>, Comma</p>
                        <p>VBZ Verb, present</p>
                        <p>. Sent-final punct</p>
                        <p>WDT Wh-determiner</p>
                        <p>: Mid-sent punct.</p>
                        <p>WP Wh pronoun</p>
                        <p>VBG verb, gerund</p>
                        <p>( Left paren</p>
                        <p>VBN verb, past part</p>
                    </div>





                </div>

                <h2 class='section-divider' id="tagged-title">Tagged Output</h2>
                <div id="tagged-text"></div>
            </div>
        </div>
    </div>
</body>

</html>
