<!DOCTYPE html>
<html>

<head>
    <title>Happy Libs</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href='../terminal.ico'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' href='../bower_components/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='../bower_components/font-awesome/css/font-awesome.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100.300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../home/css/header.css" type="text/stylesheet">
    <link rel="stylesheet" href="../home/css/fonts.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/style.css" type="text/stylesheet">

    <style>
        #sentence-display { display: none; }
        #subtitle { display: none; }
    </style>

    <script src='../bower_components/jquery/dist/jquery.min.js'></script>
    <script src='../bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
    <script src='js/script.js'></script>
</head>

<?php include("../header.php");?>

<body>
    <div class='container text-center' id='main'>
        <div class='row'>
            <div class='col-lg-12 text-center'>
                <h1 class='section-module' id='title'>Happy Libs Generator</h1>
                <h3 class='section-module' id='subtitle'>(This is a subtitle.)</a></h3>
                <div class='section-module text-center noselect' id='sentence-display'></div>
                <div class='section-module noselect'>
                    <button id='generate' type='button' class='btn btn-primary'>Generate</button>
                </div>
                <h3 class='section-module' id='sentence-counter'></h3>
            </div>
        </div>
    </div>
</body>

</html>
