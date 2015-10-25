<!DOCTYPE html>
<!-- Gradients: A simple color game
Author:Dan Zheng
Date: 10/2/2015
Created for Vandyhacks
 -->
<html>

<head>
    <title>Gradients</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href='terminal.ico'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='bower_components/font-awesome/css/font-awesome.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100.300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/header.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/fonts.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/gradients.css" type="text/stylesheet">

    <style>
        #level-win { display: none; }
    </style>

	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
	<script src="bower_components/jquery.pep/src/jquery.pep.js"></script>
	<script src="bower_components/xcolor/jquery.xcolor.min.js"></script>
	<script src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
	<script src="js/gradients.js"></script>
</head>

<?php include("header.php");?>

<body>
    <div class='container noselect' id='main'>
        <!--<div id='game-title' class='text-center'>Gradients: a simple color game</div>-->
        <div class = 'module text-center' id='level'></div>
    	<div class='board module' id="sort"></div>
    	<div id="unsort" class='board module'></div>
        <div id='level-win'>
            <div id='level-btn' class='module'><button type='button' class='btn btn-primary'>Next Level</button></div>
            <div id='win-message'></div>
        </div>
    </div>
</body>

</html>
