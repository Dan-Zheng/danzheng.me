/* jshint -W041 */

var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game', null, false, false);
var changeSprite = false;

var mainState = {

    preload: function() {
        if (changeSprite) {
            game.stage.backgroundColor = '#e0c198';
        } else {
            game.stage.backgroundColor = '#74c6cd';
        }

        game.load.image('bird', 'assets/birdSprite.png');
        game.load.image('pipe', 'assets/pipeSprite.png');
        game.load.image('birdAlt', 'assets/purdue.png');
        game.load.image('pipeAlt', 'assets/iu.png');

        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.pipes = game.add.group();
        this.pipes.enableBody = true;

        if (changeSprite) {
            this.bird = this.game.add.sprite(100, 235, 'birdAlt');
            this.pipes.createMultiple(20, 'pipeAlt');
        } else {
            this.bird = this.game.add.sprite(100, 235, 'bird');
            this.pipes.createMultiple(20, 'pipe');
        }

        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        //game.input.onDown.add(enableBirdPhysics());

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        var switchSpriteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        switchSpriteKey.onDown.add(this.switchSprite, this);
        switchSpriteKey.onDown.add(this.restartGame, this);

        this.score = -1;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px monospace", fill: "#ffffff" });

        // Add the jump sound
        this.jumpSound = this.game.add.audio('jump');
    },

    update: function() {
        if (this.bird.inWorld == false)
            this.restartGame();

        if (this.score >= 5)
            $('#hidden-msg').fadeIn(700);

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        // Slowly rotate the bird downward, up to a certain point.
        if (this.bird.angle < 20)
            this.bird.angle += 1;
    },

    jump: function() {
        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return;

        this.bird.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.bird).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
    },

    switchSprite: function() {
        if (this.bird.key === 'bird') {
            changeSprite = true;
            this.bird.loadTexture('birdAlt');
        } else {
            changeSprite = false;
            this.bird.loadTexture('bird');
        }
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function() {
        game.state.start('main');
    },

    addOnePipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1)
                this.addOnePipe(400, i*60+10);

        this.score += 1;
        this.labelScore.text = this.score;
    },

    enableBirdPhysics: function() {
        this.bird.body.gravity.y = 1000;
    }
};

game.state.add('main', mainState);
game.state.start('main');
