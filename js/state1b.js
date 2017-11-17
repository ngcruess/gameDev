var state2Music, targets, targetsKilled = 0;
demo.state1b = function(){};
demo.state1b.prototype= {
    preload: function(){                
        game.load.audio('bossMusic', '../assets/audio/bossMusic.mp3');
        game.load.image('shoot','../assets/images/textshoot.png'); 
        game.load.image('shot', '../assets/images/projectile.png'); game.load.image('spacebar','../assets/sprites/spacebar.png');
        game.load.image('bg','../assets/images/yellowbg.png');
        game.load.image('square', '../assets/images/emptySquare.png');
        game.load.image('target', '../assets/images/target.png');
       
        game.load.spritesheet ('cbutton','../assets/buttons/continuespritesheet.png',107, 44);
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        
    },
    create: function(){
        
        state2Music = game.sound.add('bossMusic');
        state2Music.allowMultiple = false;
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        game.stage.backgroundColor = '#332e31';
        var bg = game.add.sprite(50,100, 'bg');
        bg.scale.setTo(20, 12);
        cbutton = game.add.button(game.world.centerX,game.world.centerY +300, 'cbutton', function actionOnClick(){
            game.state.start('state2Title');
            state2Music.play();
            state2Music.loopFull();
        }, this, 1,0,1,2);
        cbutton.anchor.x = 0.5;
        cbutton.anchor.y = 0.5;
        cbutton.onInputOver.add(over, this);
        cbutton.onInputOut.add(out, this);
        cbutton.onInputUp.add(up, this);
        cbutton.onInputDown.add(down, this);
        cbutton.input.useHandCursor = true;
        cbutton.scale.setTo(1.5, 1.5);
        
        var spacebar = game.add.sprite(300, 570, 'spacebar')
        spacebar.anchor.x = 0.5;
        spacebar.anchor.y = 0.5;
        
        var shoot = game.add.sprite(300, 630, 'shoot')
        shoot.anchor.x = 0.5;
        shoot.anchor.y = 0.5;
        
       
        
                        //PLATFORMS//
        ///////////////////////////////////////////////////
        shelf = game.add.sprite(200, 468, 'shelfStandard');
        shelf.scale.setTo(3, 1);
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(500, 328, 'shelfStandard');
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(700, 468, 'shelfStandard');
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(900, 196, 'shelfStandard');
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1300, 468, 'shelfStandard');
        shelf.scale.setTo(3, 1);
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        ///////////////////////////////////////////////////
        
                            //INVISIBLE BOUNDS//
        ///////////////////////////////////////////////////
        var box = game.add.sprite(45, 290, 'square');
        box.scale.setTo(1, 38);
        game.physics.p2.enable(box, false);
        box.body.static = true;
        
        box = game.add.sprite(750, 95, 'square');
        box.scale.setTo(150, 1);
        game.physics.p2.enable(box, false);
        box.body.static = true;
        
        box = game.add.sprite(1455, 290, 'square');
        box.scale.setTo(1, 38);
        game.physics.p2.enable(box, false);
        box.body.static = true;        
        ///////////////////////////////////////////////////
        
                              //TARGETS//
        ///////////////////////////////////////////////////
        targets = game.add.group();
        var target = targets.create(500, 276, 'target');
        game.physics.p2.enable(target, false);
        target.body.static = true;
        
        var target = targets.create(700, 416, 'target');
        game.physics.p2.enable(target, false);
        target.body.static = true;
        
        var target = targets.create(900, 144, 'target');
        game.physics.p2.enable(target, false);
        target.body.static = true;
        
        var target = targets.create(1250, 416, 'target');
        game.physics.p2.enable(target, false);
        target.movingUp = true;
        target.body.data.gravityScale = 0;
        ///////////////////////////////////////////////////
        
        
                            // KEYBOARD //
        ////////////////////////////////////////////////////
        // CALLBACK FOR DOUBLE JUMP
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode)
            if (e.keyCode == 38 || e.keyCode == 87){
                jumpRel = true;
            } 
        }          
        cursor = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);       
        
                        // MITTENS //
        ///////////////////////////////////////////////////
        mittens = game.add.sprite(108, 343, 'mittens2');
        //mittens = game.add.sprite(1812, 447, 'mittens2');
        //mittens = game.add.sprite(3360, 263, 'mittens2');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysics', 'ShootingMouth-2', 1, -Math.PI * 2);
        mittens.frame = 3;
        mittens.body.fixedRotation = true;
        mittens.animations.add('left', [0,1,2], 10, true);
        mittens.animations.add('right', [3,4,5], 10, true);
        mittens.invincible = false;
        mittens.flight = false;
        
        game.camera.follow(mittens);
        mittens.body.onBeginContact.add(mittensHit);
        
        //Bullets        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.P2JS;
        bullets.createMultiple(100, 'shot', false);
        bullets.setAll('owner', 'm');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        bullets.forEach(function(bullet) {
            bullet.body.onBeginContact.add(bulletHit, bullet);
        })     
    },
    update: function(){        
        state1Music.stop();
        moveMittens();
        moveTarget();
        if (mittens.y > 500) {
            mittens.reset(108, 343);
        }
        
        if (bottomTouching(mittens)) {
            jumps = 2;
        }
        if (shootButton.isDown) {
            mittensShoot();
        }
        if (targetsKilled > 3) {
            game.state.start('state2Title');
        }
    }
};
function moveTarget() {
    target = targets.children[3];
    if (target.x != 1250) {
        target.reset(1250, target.y);
    }
    if (target.movingUp && target.y > 138) {
        target.body.moveUp(200);
    }
    else if (target.y <= 416 && !target.movingUp) {
        target.body.moveDown(200);
    }
    if (target.y <= 138) {
        target.movingUp = false;
    }
    if (target.y >= 416) {
        target.movingUp = true;
    }
}

