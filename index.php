<!DOCTYPE html>

<head>
    <title>Dan Zheng</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href='terminal.ico'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='bower_components/font-awesome/css/font-awesome.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/header.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/fonts.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/index.css" type="text/stylesheet">

	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
    <!--<script type="text/javascript" src="bower_components/d3/d3.js"></script>-->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
    <!--<script type="text/javascript" src="js/plax.js"></script>-->
    <script type="text/javascript" src="js/app.js"></script>
</head>

<?php include("header.php");?>

<body id='home'>
    <div class="jumbotron fullscreen text-center">
        <div class='row' id='main'>
            <h1>Hello, world!</h1>
            <p class='section-module' id='subtitle'>I'm <a href="http://github.com/Dan-Zheng">Dan Zheng</a>.
                <!--<span class="rw-words rw-words-1" id='textScroll'>
                    <span id='text1'>student.</span>
                    <span id='text2'>bilingual.</span>
                    <span id='text3'>developer.</span>
                    <span id='text4'>human being.</span>
                </span>-->
            </p>
            <!--<p class='text-center' id='liga'>->> >> -> <=> ==> >>= -- := =:= == != <= >= // /** /* */ && .& || !! :: >> __ ___ .. ...</p>-->
            <p class='section-module'><a class="btn btn-primary btn-lg" href="#" role="button" id='randomProject'>Random Project!</a></p>
            <ul class="list-inline social-buttons">
                <li><a href="https://github.com/Dan-Zheng" target="_blank"><i class="fa fa-github"></i></a>
                </li>
                <li><a href="https://www.facebook.com/VoidQuery" target="_blank"><i class="fa fa-facebook"></i></a>
                </li>
            </ul>
        </div>
    </div>
    <div class='fullscreen bg-dark'>
        <div class='container lots-of-space' id='projects'>
            <h1 class='text-center' id='title'>Projects</h1>
            <h2 class='text-center gimme-space'>Completed Projects</h2>
            <div class="list-group" id='completed-projects'>
                <a href="gradients.php" class="list-group-item">
                    <h4 class="list-group-item-heading black-text">gradients</h4>
                    <p class="list-group-item-text">A simple gradient color game.</p>
                </a>
                <a href="flappy-bird.php" class="list-group-item">
                    <h4 class="list-group-item-heading">flappy-bird</h4>
                    <p class="list-group-item-text">A clone of Flappy Bird made using phaser.js.</p>
                </a>
                <a href="floats-your-boat.php" class="list-group-item">
                    <h4 class="list-group-item-heading">floats-your-boat</h4>
                    <p class="list-group-item-text">A generator for phrases like "Hey, whatever floats your boat."</p>
                </a>
            </div>
            <h2 class='text-center gimme-space'>Works in Progress</h2>
            <div class="list-group" id='incomplete-projects'>
                <a href="rubik-solver.php" class="list-group-item">
                    <h4 class="list-group-item-heading">rubik-solver</h4>
                    <p class="list-group-item-text">A Rubik's Cube solver.</p>
                </a>
                <a href="happy-libs.php" class="list-group-item">
                    <h4 class="list-group-item-heading">happy-libs</h4>
                    <p class="list-group-item-text">A simple mad-libs generator.</p>
                </a>
            </div>
        </div>
    </div>
    <div>
        <div class='container lots-of-space' id='contact'>
            <h1 class='text-center' id='title'>Contact</h1>
            <h2 class='text-center gimme-space'>Find me here.</h2>
            <div id="contact" class="full-wh">
                <div id="contact-svg-container"></div>
            </div>
        </div>
    </div>
</body>
