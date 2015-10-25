<!DOCTYPE html>
<html>

<head>
    <title>Floats Your Boat</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href='terminal.ico'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='bower_components/font-awesome/css/font-awesome.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100.300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/header.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/fonts.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/floats-your-boat.css" type="text/stylesheet">

    <style>
        /*#sentence { display: none }*/
        #sentence-display { display: none; }
        #sentence2 { display: none; }
        #sentence3 { display: none; }
        #explanation { display: none; }
    </style>

    <script src='bower_components/jquery/dist/jquery.min.js'></script>
    <script src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
    <script src='js/floats-your-boat.js'></script>
</head>

<?php include("header.php");?>

<body>
    <div class='container text-center' id='main'>
        <div class='row'>
            <div class='col-lg-12 text-center'>
                <h1 class='section-module' id='title'>Floats-your-boat Generator</h1>
                <h3 class='section-module' id='subtitle'>(Inspired by <a href="http://www.amazon.com/How-Ace-Rest-Calculus-MultiVariable/dp/0716741741" target='blank'>"How to Ace the Rest of Calculus: The Streetwise Guide"</a>)</h3>
                <div class='section-module noselect' id='sentence-display'>
                </div>
                <div class='section-module'>
                    <button id='generate' type='button' class='btn btn-primary'>Generate</button>
                </div>
                <h3 class='section-module' id='sentence-counter'></h3>
                <h3 class='section-module' id='explanation'></h3>
            </div>
        </div>
    </div>
</body>

</html>
