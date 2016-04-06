<!DOCTYPE html>
<html>

<head>
    <title>Rubik Solver</title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href='terminal.ico'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='bower_components/font-awesome/css/font-awesome.min.css'>
    <link rel='stylesheet' href='bower_components/animate.css/animate.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100.300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/header.css" type="text/css">
    <link rel="stylesheet" href="css/fonts.css" type="text/css">
    <link rel="stylesheet" href="css/rubik-solver.css" type="text/css">

    <style>
        #randomState { display: none; }
        #resultText { display: none; }
        #algText { display: none; }
        #algMoves { display: none; }
        #lastMoves { display: none; }
        #scramble { display: none; }
        #solve { display: none; }
        #undo { display: none; }
        #redo { display: none; }
        #solution { display: none; }
    </style>

    <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
    <script type="text/javascript" src='bower_components/letteringjs/jquery.lettering.js'></script>
    <script type="text/javascript" src='bower_components/textillate/jquery.textillate.js'></script>
    <script type="text/javascript" src='cubejs/lib/cube.js'></script>
    <script type="text/javascript" src='cubejs/lib/solve.js'></script>
    <script type="text/javascript" src='cubejs/lib/async.js'></script>
    <script type="text/javascript" src='js/rubik-solver.js'></script>
</head>

<?php include("header.php");?>

<body>
    <!--<g-cube>
        <g-speed>3</g-speed>
    </g-cube>-->
    <div class='container' id='main'>
        <div class='module text-center' id='title'>Cubed. <span class="tlt">A Rubik's Cube solver.</span></div>
        <div class='module text-center' id='status'></div>
        <div class='text-center' id='randomState'>
            <div class='noselect' id='result'>
                <div id='resultFront'></div>
                <div id='resultBack'></div>
            </div>
            <div class='module noselect'>
                <button type='button' class='btn btn-primary' id='start'>Start</button>
                <button type='button' class='btn btn-primary' id='scramble'>Scramble</button>
                <button type='button' class='btn btn-primary' id='solve'>Solve</button>
                <button type='button' class='btn btn-primary' id='undo'>Undo</button>
                <button type='button' class='btn btn-primary' id='redo'>Redo</button>
            </div>
            <div class='module text-center' id='algText'>
                <div class='input-group col-md-8 col-md-offset-2'>
                    <span class='input-group-btn'>
                        <button type='button' class='btn btn-secondary' id='genAlg'>Generate</button>
                    </span>
                    <input type='text' class='form-control' id='algInput' placeholder='Enter algorithm here:' value=''>
                    <span class='input-group-btn'>
                        <button type='button' class='btn btn-secondary' id='doAlg'>Perform</button>
                    </span>
                </div>
            </div>
            <div class='module text-center noselect' role='toolbar' id='algMoves'>
                <div class='btn-group text-center' role='group' id='algTranslate'>
                    <button type='button' class='btn btn-primary alg-button' value='U'>U</button>
                    <button type='button' class='btn btn-primary alg-button' value='U&#39;'>U'</button>
                    <button type='button' class='btn btn-primary alg-button' value='D'>D</button>
                    <button type='button' class='btn btn-primary alg-button' value='D&#39;'>D'</button>
                    <button type='button' class='btn btn-primary alg-button' value='F'>F</button>
                    <button type='button' class='btn btn-primary alg-button' value='F&#39;'>F'</button>
                    <button type='button' class='btn btn-primary alg-button' value='B'>B</button>
                    <button type='button' class='btn btn-primary alg-button' value='B&#39;'>B'</button>
                    <button type='button' class='btn btn-primary alg-button' value='R'>R</button>
                    <button type='button' class='btn btn-primary alg-button' value='R&#39;'>R'</button>
                    <button type='button' class='btn btn-primary alg-button' value='L'>L</button>
                    <button type='button' class='btn btn-primary alg-button' value='L&#39;'>L'</button>
                </div>
                <!--<div class='btn-group text-center' role='group' id='algRotate'>
                    <button type='button' class='btn btn-primary' value='X'>x</button>
                    <button type='button' class='btn btn-primary'value='X&#39;'>x'</button>
                    <button type='button' class='btn btn-primary' value='Y'>y</button>
                    <button type='button' class='btn btn-primary'value='Y&#39;'>y'</button>
                    <button type='button' class='btn btn-primary' value='Z'>z</button>
                    <button type='button' class='btn btn-primary' value='Z&#39;'>z'</button>
                </div>-->
            </div>
        </div>
        <pre class='module' id='resultText'></pre>
        <pre class='module' id='lastMoves'>Moves: </pre>
        <pre class='module' id='solution'>Solution: </pre>
    </div>
</body>

</html>
