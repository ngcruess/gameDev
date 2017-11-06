var centerX =  vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0, healthText, timer, milliseconds = 0, seconds = 0, minutes = 0, mice, mouseMovingRight = true, sock, sockJumpTimer = 1000, music, death, shelf, turret;

demo.state1 = function() {};
demo.state1.prototype = {
    preload: function() {
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.image('shot', '../assets/images/projectile.png');
        game.load.image('mouse', '../assets/sprites/ToyMouse-1.png')
        game.load.image('turret', '../assets/sprites/mrShooty.png');
        game.load.spritesheet('sockSheet','../assets/sprites/EvilSock.png', 90, 135);
        game.load.image('sockL', '../assets/sprites/EvilSockL.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        
        game.load.image('wall', '../assets/images/livingroomwall.png');
        game.load.image('sky', '../assets/images/sky.png');
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        game.load.physics('mousePhysicsL', '../assets/polygons/ToyMouseL.json')
        game.load.physics('mousePhysicsR', '../assets/polygons/ToyMouseR.json')
        
        game.load.audio('music', '../assets/audio/bgmusic02.mp3');
        game.load.audio('death', '../assets/audio/mittensDeath.wav');
        
    },
    create: function() {
        
                    // P2 PHYSICS AND ENVIRONMENT //
        ////////////////////////////////////////////////////
        game.world.setBounds(0, 0, 6400, 800);
        game.stage.backgroundColor = '#B25F55';
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        
        var sky = game.add.sprite(0, 0, 'sky');
        sky.scale.setTo(10, 1.5);
        
        var wall = game.add.sprite(0,0, 'wall');
        wall.scale.setTo(10, 10);
        
        wall = game.add.sprite(3000,0, 'wall');
        wall.scale.setTo(10, 10);
        
        var instructionText = game.add.text(100, 80, "KITCHEN -->"); 
        var intoTheAbyss = game.add.text(game.world.width - 700, 80, "ONWARD BROTHER, INTO THE ABYSS -->");
        
                            //PLATFORMS//
        ////////////////////////////////////////////////////
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        shelf = game.add.sprite(196, 600, 'shelfStandard');
        shelf.scale.setTo(1.84, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(612, 344, 'shelfStandard');
        shelf.scale.setTo(5.04, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(600, 600, 'shelfStandard');
        shelf.scale.setTo(0.32, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1340, 728, 'shelfStandard');
        shelf.scale.setTo(2.96, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1616, 784, 'shelfStandard');
        shelf.scale.setTo(0.96, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1816, 504, 'shelfStandard');
        shelf.scale.setTo(0.4, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2080, 200, 'shelfStandard');
        shelf.scale.setTo(5.12, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1952, 512, 'shelfStandard');
        shelf.scale.setTo(0.32, 20);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2462, 224, 'shelfStandard');
        shelf.scale.setTo(0.32, 12);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2296, 400, 'shelfStandard');
        shelf.scale.setTo(3.36, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2128, 368, 'shelfStandard');
        shelf.scale.setTo(0.32, 3);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2352, 592, 'shelfStandard');
        shelf.scale.setTo(4.16, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(3032, 592, 'shelfStandard');
        shelf.scale.setTo(0.64, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(3352, 320, 'shelfStandard');
        shelf.scale.setTo(0.64, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(4120, 216, 'shelfStandard');
        shelf.scale.setTo(6.40, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        ////////////////////////////////////////////////////
        
        timer = game.add.text(875,0, "00:00:00");
        timer.fixedToCamera = true;
        
        music = game.sound.add('music');
        music.allowMultiple = false;
        music.play();
        
        death = game.sound.add('death');
        death.startTime = 200;
        ////////////////////////////////////////////////////
        
        
                            // KEYBOARD //
        ////////////////////////////////////////////////////
        // CALLBACK FOR DOUBLE JUMP
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode)
            if (e.keyCode == 38){
                jumpRel = true;
            } 
        }  
        
        cursor = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        ////////////////////////////////////////////////////
        
        
                        // MITTENS //
        ///////////////////////////////////////////////////
        mittens = game.add.sprite(125, 525, 'mittens2');
        //mittens = game.add.sprite(1812, 447, 'mittens2');
        //mittens = game.add.sprite(3561, 263, 'mittens2');
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
        
                        //MR SHOOTY//
        ///////////////////////////////////////////////////
        /////HE SHOOT || HE STOP || HE SHOOT SOME MORE/////
        turret = game.add.sprite(600, 568, 'turret');
        game.physics.p2.enable(turret, false);
        turret.body.fixedRotation = true;
        turret.body.static = true;
        
        ///////////////////////////////////////////////////
        
                        //MICE//
        ///////////////////////////////////////////////////        
        mice = game.add.group();
        mice.enabledBody = true;
        mice.physicsBodyType = Phaser.Physics.P2JS;
        
        var mouse = mice.create(429, 316, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 0;
        mouse.movingRight = false ;
        mouse.leftXLim = 429;
        mouse.rightXLim = 579;
        mouse.yLim = 316;
        mouse.speed = 150;
        
        mouse = mice.create(851, 316, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 1;
        mouse.movingRight = false;
        mouse.leftXLim = 649;
        mouse.rightXLim = 851;
        mouse.yLim = 316;
        mouse.speed = 150;
        
        mouse = mice.create(1222, 700, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 2;
        mouse.movingRight = true;
        mouse.leftXLim = 1222;
        mouse.rightXLim = 1455;
        mouse.yLim = 700;
        mouse.speed = 300;
        
        mouse = mice.create(1624, 756, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 3;
        mouse.movingRight = true;
        mouse.leftXLim = 1624;
        mouse.rightXLim = 1624;
        mouse.yLim = 575;
        mouse.speed = 300;
        
        mouse = mice.create(2227, 372, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 4;
        mouse.movingRight = true;
        mouse.leftXLim = 2227;
        mouse.rightXLim = 2400;
        mouse.yLim = 372;
        mouse.speed = 300;
        
        mouse = mice.create(2234, 564, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 5;
        mouse.movingRight = true;
        mouse.leftXLim = 2234;
        mouse.rightXLim = 2540;
        mouse.yLim = 564;
        mouse.speed = 300;
        
        mouse = mice.create(3052, 564, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.body.data.gravityScale = 0.7;
        mouse.id = 6;
        mouse.movingRight = true;
        mouse.leftXLim = 3052;
        mouse.rightXLim = 3052;
        mouse.yLim = 564;
        mouse.speed = 300;
        
        mouse = mice.create(4406, 159, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 7;
        mouse.movingRight = true;
        mouse.leftXLim = 3800;
        mouse.rightXLim = 4406;
        mouse.yLim = 188;
        mouse.speed = 1000;        
        ///////////////////////////////////////////////////
        
                        //SOCKS//
        ///////////////////////////////////////////////////
        //sock = game.add.sprite(0, 0, 'sockL');
        //game.physics.p2.enable(sock, true);
        ///////////////////////////////////////////////////
        
                        //BULLETS//
        ///////////////////////////////////////////////////
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.P2JS;
        bullets.createMultiple(100, 'shot', false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('ckeckWorldBounds', true);
        bullets.forEach(function(bullet) {
            bullet.body.onBeginContact.add(bulletHit, bullet);
        })
        ///////////////////////////////////////////////////        
    },
    update: function() { 
        //console.log(mittens.x, mittens.y)
        moveMittens();
        if (mittens.y > 750) {
            killMittens();
        }
        moveMice();     
        updateTimer();
        if (mittens.x > 6000){
            game.state.start("state2");
            music.stop();
        }
    }
};
function updateTimer() {
    minutes = Math.floor(game.time.now/60000)% 60;
    seconds = Math.floor(game.time.now/1000) % 60;
    milliseconds = Math.floor(game.time.now) % 100;
    
    if (milliseconds < 10) { milliseconds = "0" + milliseconds};
    if (seconds < 10) { seconds = '0' + seconds};
    if (minutes <10) { minutes = '0' + minutes};
    timer.setText(minutes + ":" + seconds + ":" + milliseconds);    
}
function moveMice() {
    for (var i = 0, len = mice.children.length; i < len; i++) {
        var mouse = mice.children[i];
        if (mouse.id == 3 || mouse.id == 6) {
            var y = mouse.y;
            mouse.body.velocity.x = 0;
            if (bottomTouching(mouse)) {
                mouse.body.moveUp(1000);
            }
            if (Math.abs(mouse.x - mouse.leftXLim) > 20) {
                mouse.reset(mouse.leftXLim, mouse.y);
            }
        }
        else {
            if (mouse.movingRight && mouse.x < mouse.rightXLim) {
                mouse.body.moveRight(mouse.speed);
            }
            else if (mouse.x > mouse.leftXLim) {
                mouse.body.moveLeft(mouse.speed);
            }
            if (mouse.x >= mouse.rightXLim) {
                mouse.movingRight = false;
                mouse.frame = 0;
            }
            else if (mouse.x <= mouse.leftXLim) {
                mouse.movingRight = true;
                mouse.frame = 4;
            }
            if (mouse.x > mouse.rightXLim + 30 || mouse.x < mouse.leftXLim - 10 || mouse.y < mouse.yLim - 10 || mouse.y > mouse.yLim + 10) {
                mouse.reset(mouse.leftXLim, mouse.yLim);
            }
        }
    }
}









