/* jshint -W041 */

var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game', null, false, false);
var MODE_VANILLA = 0;
var MODE_PURDUE = 1;
var MODE_FISH = 2;
var mode = MODE_VANILLA;

var mainState = {

    preload: function() {
        if (mode === MODE_PURDUE) {
            console.log(mode);
            game.stage.backgroundColor = '#e0c198';
        } else if (mode === MODE_FISH) {
            console.log(mode);
            game.stage.backgroundColor = '2185C5';
        } else { //if (mode === MODE_VANILLA)
            console.log(mode);
            game.stage.backgroundColor = '#74c6cd';
        }

        game.load.image('bird', 'assets/birdSprite.png');
        game.load.image('pipe', 'assets/pipeSprite.png');
        game.load.image('purdue', 'assets/purdue.png');
        game.load.image('iu', 'assets/iu.png');
        game.load.image('fish', 'assets/fishSprite.png');
        game.load.image('coral', 'assets/coralSprite.png');
        game.load.image('bubble', 'assets/bubbleSprite.png');

        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.pipes = game.add.group();
        this.bubbles = game.add.group();
        this.pipes.enableBody = true;

        if (mode === MODE_PURDUE) {
            this.bird = this.game.add.sprite(100, 235, 'purdue');
            this.pipes.createMultiple(20, 'iu');
        } else if (mode === MODE_FISH) {
            this.bird = this.game.add.sprite(100, 235, 'fish');
            this.pipes.createMultiple(20, 'coral');
        } else {
            this.bird = this.game.add.sprite(100, 235, 'bird');
            this.pipes.createMultiple(20, 'pipe');
        }

        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        game.physics.arcade.enable(this.bird);
        if (mode != MODE_FISH)
            this.bird.body.gravity.y = 1000;
        else
            this.bird.body.gravity.y = -1000;
        //game.input.onDown.add(enableBirdPhysics());

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);

        var switchSpriteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        switchSpriteKey.onDown.add(function() { this.switchSprite(MODE_PURDUE);}, this);
        switchSpriteKey.onDown.add(this.restartGame, this);

        var modeFishKey = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
        modeFishKey.onDown.add(function() { this.switchSprite(MODE_FISH);}, this);
        modeFishKey.onDown.add(this.restartGame, this);

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
        if (mode != MODE_FISH) {
            if (this.bird.angle < 15)
                this.bird.angle += 1;
        } else {
            if (this.bird.angle > -15)
                this.bird.angle -= 0.6;
        }

        /*if (game.input.activePointer.withinGame) {
            this.bird.body.gravity.y = 1000;
            // Slowly rotate the bird downward, up to a certain point.
            if (this.bird.angle < 15)
                this.bird.angle += 1;
        }*/

    },

    jump: function() {
        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return;

        if (mode != MODE_FISH) {
            this.bird.body.velocity.y = -350;
            game.add.tween(this.bird).to({angle: -40}, 100).start();
        }
        else {
            this.bird.body.velocity.y = 350;
            game.add.tween(this.bird).to({angle: 20}, 100).start();
            this.makeBubbles();
        }

        // Play sound
        this.jumpSound.play();
    },

    makeBubbles: function() {
        for (var i = 0; i < 3; i++) {
            var widthRange = this.bird.x + this.bird.width;
            var heightRange = this.bird.y + this.bird.height / 2;
            var bubble = this.bubbles.create(widthRange, heightRange, 'bubble');
            game.physics.arcade.enable(bubble);
            bubble.scale.set(game.rnd.realInRange(0.3, 0.5));
            //var speed = game.rnd.between(4000, 6000);
            //game.add.tween(bubble).to({ y: 0 }, speed, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
            //bubble.body.velocity.
            bubble.body.velocity.y = game.rnd.realInRange(-250, -150);
            bubble.body.velocity.x = -200;
            bubble.checkWorldBounds = true;
            bubble.outOfBoundsKill = true;
        }
    },

    switchSprite: function(modeNew) {
        if (mode != modeNew) {
            if (modeNew === MODE_PURDUE) {
                this.bird.loadTexture('purdue');
            } else if (modeNew === MODE_FISH) {
                this.bird.loadTexture('fish');
            }
            mode = modeNew;
        } else {
            this.bird.loadTexture('bird');
            mode = MODE_VANILLA;
        }

/*
        if (modeNew === MODE_PURDUE) {
            if (mode != MODE_PURDUE) {
                mode = MODE_PURDUE;
                this.bird.loadTexture('purdue');
                //game.stage.backgroundColor = '#e0c198';
                //this.pipes.setAll(key,'iu');
            } else {
                mode = MODE_VANILLA;
                this.bird.loadTexture('bird');
                //game.stage.backgroundColor = '#74c6cd';
                //this.pipes.setAll(key,'pipe');
            }
        } else if (modeNew === MODE_FISH) {
            if (mode != MODE_FISH) {
                mode = MODE_FISH;
                this.bird.loadTexture('fish');
                //game.stage.backgroundColor = '#e0c198';
                //this.pipes.setAll(key,'iu');
            } else {
                mode = MODE_VANILLA;
                this.bird.loadTexture('bird');
                //game.stage.backgroundColor = '#74c6cd';
                //this.pipes.setAll(key,'pipe');
            }
        }*/
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
        game.state.restart('main');
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
    }
};

game.state.add('main', mainState);
game.state.start('main');
