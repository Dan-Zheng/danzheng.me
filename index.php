<!DOCTYPE html>

<head>
    <title>Dan Zheng</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel="shortcut icon" href='terminal.ico'/>
    <link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.min.css'>
	<link rel='stylesheet' href='bower_components/font-awesome/css/font-awesome.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="home/css/header.css" type="text/stylesheet">
    <link rel="stylesheet" href="home/css/fonts.css" type="text/stylesheet">
	<link rel="stylesheet" href="home/css/style.css" type="text/stylesheet">

	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
	<script src="bower_components/jquery.pep/src/jquery.pep.js"></script>
	<script src="bower_components/xcolor/jquery.xcolor.min.js"></script>
	<script src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
	<script src="home/js/script.js"></script>
</head>
<!--
<header>
    <nav class='navbar navbar-inverse navbar-fixed-top noselect'>
        <div class='container'>
            <div class='navbar-header page-scroll'>
                <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                    <span class='sr-only'>Toggle navigation</span>
                    <span class='icon-bar'></span>
                    <span class='icon-bar'></span>
                    <span class='icon-bar'></span>
                </button>
                <a class='navbar-brand page-scroll' href='index.html'>
                    <i class='icon-picker fa fa-terminal'></i>Dan Zheng
                </a>
            </div>
            <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                <ul class='nav navbar-nav navbar-right'>
                    <li><a href='./index.html'>Home</a></li>--><!--
                    <li><a id='nav-about' href='#about-section'>About</a></li>
                    <li><a id='nav-contact' href='#contact-section'>Contact</a></li>--><!--
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Projects<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a id='nav-gradi' href='gradients/index.html'>Gradients</a></li>
        					<li><a id='nav-rubik' href='rubik-solver/index.html'>Rubik Solver</a></li>
                            <li><a id='nav-floats' href='floats-your-boat/index.html'>Floats Your Boat</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a id='nav-libs' href='happy-libs/index.html'>Happy Libs</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>-->

<?php include("header.php");?>

<body>
    <div class="jumbotron text-center">
        <div class="container" id='main'>
            <h1>Hello, world!</h1>
            <p id='subtitle'>This website is a repository for projects by <a href="http://github.com/Dan-Zheng">Dan Zheng</a>.</p>
            <p>Try using the navbar!</p>
            <!--<p class='text-center' id='liga'>->> >> -> <=> ==> >>= -- := =:= == != <= >= // /** /* */ && .& || !! :: >> __ ___ .. ...</p>-->
            <p><a class="btn btn-primary btn-lg" href="#" role="button">Useless button!</a></p>
            <ul class="list-inline social-buttons">
                <li><a href="https://github.com/Dan-Zheng" target="_blank"><i class="fa fa-github"></i></a>
                </li>
                <li><a href="https://www.facebook.com/VoidQuery" target="_blank"><i class="fa fa-facebook"></i></a>
                </li>
            </ul>
        </div>
    </div>
    <div class='container' id='hi'>
    </div>
</body>
