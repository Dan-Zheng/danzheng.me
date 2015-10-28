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
                </div>

                <h2 class='section-divider' id="tagged-title">Tagged Output</h2>
                <div id="tagged-text"></div>
            </div>
        </div>
    </div>
</body>

</html>
