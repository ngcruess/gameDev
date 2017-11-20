var mittens, orbs;

demo.sandbox = function() {};
demo.sandbox.prototype = {
    preload: function() {
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        game.load.image('grid', '../assets/images/grid.png');
        game.load.image('orb', '../assets/images/orb.png');
    },
    create: function() {
        
                    // P2 PHYSICS AND ENVIRONMENT //
        ////////////////////////////////////////////////////
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.world.setBounds(0, 0, 6000, 800);
        game.stage.backgroundColor = '#CCCCCC';
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        timer = game.add.text(1375,0, "00:00:00");
        timer.fixedToCamera = true;
        
        var grid = game.add.sprite(0, 0, 'grid');
        ////////////////////////////////////////////////////        
        
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
        ////////////////////////////////////////////////////
        
                        //PLATFORMS//
        ////////////////////////////////////////////////////
        shelf = game.add.sprite(48, 464, 'shelfStandard');
        shelf.scale.setTo(.96, 21);
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(304, 336, 'shelfStandard');
        shelf.scale.setTo(.32, 21);
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        ////////////////////////////////////////////////////
        
        
                        // MITTENS //
        ////////////////////////////////////////////////////
        mittens = game.add.sprite(34, 86, 'mittens2');
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
        ///////////////////////////////////////////////////
        
                          //ORBS//
        ///////////////////////////////////////////////////
        orbs = game.add.group();
        
        var orb = orbs.create(256, 128, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 0;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 128;
        orb.speed = 200;
        
        orb = orbs.create(224, 160, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 1;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 160;
        orb.speed = 200;
        
        orb = orbs.create(192, 192, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 2;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 192;
        orb.speed = 200;
        
        orb = orbs.create(160, 224, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 3;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 224;
        orb.speed = 200;
        
        orb = orbs.create(128, 256, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 4;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 256;
        orb.speed = 200;
        
        orb = orbs.create(128, 288, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 5;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 288;
        orb.speed = 200;
        
        orb = orbs.create(160, 320, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 6;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 320;
        orb.speed = 200;
        
        orb = orbs.create(192, 352, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 7;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 352;
        orb.speed = 200;
        
        orb = orbs.create(224, 384, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 8;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 384;
        orb.speed = 200;
        
        orb = orbs.create(256, 416, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 9;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 416;
        orb.speed = 200;
        
        orb = orbs.create(256, 448, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 10;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 448;
        orb.speed = 200;
        
        orb = orbs.create(224, 480, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 11;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 480;
        orb.speed = 200;
        
        orb = orbs.create(192, 512, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 12;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 512;
        orb.speed = 200;
        
        orb = orbs.create(160, 544, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 13;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 544;
        orb.speed = 200;
        
        orb = orbs.create(128, 576, 'orb');
        game.physics.p2.enable(orb, false);
        orb.body.data.gravityScale = 0;
        orb.body.fixedRotation = true;
        orb.id = 14;
        orb.movingRight = false;
        orb.leftXLim = 128;
        orb.rightXLim = 272;
        orb.yLim = 576;
        orb.speed = 200;
        ///////////////////////////////////////////////////
    },
    update: function() { 
        //console.log(mittens.x, mittens.y)
        moveMittens();
        updateTimer();
        moveOrbs();
        if (bottomTouching(mittens)) {
            jumps = 2;
        }
    }
};
function moveOrbs() {
    for (var i = 0, len = orbs.children.length; i < len; i++) {
        var orb = orbs.children[i];
        if (orb.movingRight && orb.x < orb.rightXLim) {
            orb.body.moveRight(orb.speed);
        }
        else if (orb.x > orb.leftXLim) {
            orb.body.moveLeft(orb.speed);
        }
        if (orb.x >= orb.rightXLim) {
            orb.movingRight = false;
        }
        else if (orb.x <= orb.leftXLim) {
            orb.movingRight = true;
        }
        if (orb.x > orb.rightXLim + 30 || orb.x < orb.leftXLim - 10 || orb.y < orb.yLim - 10 || orb.y > orb.yLim + 10) {
            orb.reset(orb.leftXLim, orb.yLim);
        }        
    }
}
function updataTimer() {
    minutes = Math.floor(game.time.now/60000)% 60;
    seconds = Math.floor(game.time.now/1000) % 60;
    milliseconds = Math.floor(game.time.now) % 100;
    
    if (milliseconds < 10) { milliseconds = "0" + milliseconds};
    if (seconds < 10) { seconds = '0' + seconds};
    if (minutes < 10) { minutes = '0' + minutes};
    timer.setText(minutes + ":" + seconds + ":" + milliseconds);    
}









