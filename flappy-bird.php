<!DOCTYPE html>
<html>

<head>
    <title>Flappy Bird  </title>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href='terminal.ico'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='bower_components/font-awesome/css/font-awesome.min.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100.300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/header.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/fonts.css" type="text/stylesheet">
    <link rel="stylesheet" href="css/flappy-bird.css" type="text/stylesheet">

    <script src='bower_components/jquery/dist/jquery.min.js'></script>
    <script src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
    <script type="text/javascript" src="bower_components/phaser/build/phaser.min.js"></script>
    <script type="text/javascript" src="js/flappy-bird.js"></script>
</head>

<?php include("header.php");?>

<body>
  <div class='container text-center'>
      <h1>Flappy Bird</h1>
      <p id='subtitle'>Press spacebar to flap. Avoid the walls.</p>
      <div class='text-center' id="game"></div>
  </div>
</body>

</html>
