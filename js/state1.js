var centerX =  vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0, healthText, timer, milliseconds = 0, seconds = 0, minutes = 0, mice, mouseMovingRight = true, sock, sockJumpTimer = 1000, music, death, shelf, turret;

demo.state1 = function() {};
demo.state1.prototype = {
    preload: function() {
        game.load.image('sidetable', '../assets/images/SideTable.png');
        game.load.image('table', '../assets/images/Table.png');
        game.load.image('shelf', '../assets/images/Shelf.png');
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.image('hitzone', '../assets/images/hitbox.png');
        game.load.image('shot', '../assets/images/projectile.png');
        game.load.image('mouse', '../assets/sprites/ToyMouse-1.png')
        game.load.image('turret', '../assets/sprites/mrShooty.png');
        game.load.spritesheet('sockSheet','../assets/sprites/EvilSock.png', 90, 135);
        game.load.image('sockL', '../assets/sprites/EvilSockL.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        
        game.load.image('wall', '../assets/images/livingroomwall.png');
        game.load.image('sky', '../assets/images/sky.png');
        game.load.physics('enemyPhysicsData', '../assets/polygons/Mouse1.json');
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
        
        //healthText = game.add.text(0, 0, "Health: 100%");
        //healthText.anchor.set(0.5);
        
        var instructionText = game.add.text(100, 80, "KITCHEN -->"); 
        var intoTheAbyss = game.add.text(game.world.width - 700, 80, "ONWARD BROTHER, INTO THE ABYSS -->");
        
                            //PLATFORMS//
        ////////////////////////////////////////////////////
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        //platforms = game.add.group();
        
        //platforms.physicsBodyType = Phaser.Physics.P2JS;
        //platforms.enabledBody = true;
        
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
        
        shelf = game.add.sprite(2128, 384, 'shelfStandard');
        shelf.scale.setTo(0.32, 2);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2352, 592, 'shelfStandard');
        shelf.scale.setTo(4.16, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(3232, 592, 'shelfStandard');
        shelf.scale.setTo(0.64, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(3552, 320, 'shelfStandard');
        shelf.scale.setTo(0.64, 1);
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
        //mittens = game.add.sprite(125, 525, 'mittens2');
        //mittens = game.add.sprite(1812, 447, 'mittens2');
        mittens = game.add.sprite(3561, 263, 'mittens2');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysics', 'ShootingMouth-2', 1, -Math.PI * 2);
        mittens.frame = 3;
        mittens.body.fixedRotation = true;
        mittens.animations.add('left', [0,1,2], 10, true);
        mittens.animations.add('right', [3,4,5], 10, true);
        mittens.invincible = true;
        mittens.flight = true;
        
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
        /*
        mice = game.add.group();
        mice.enabledBody = true;
        mice.physicsBodyType = Phaser.Physics.P2JS;
        var mouse = mice.create(790, 275, 'mouse');
        //mouse.scale.setTo(.4, .4);
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 0;
        mouse.movingRight = false ;
        mouse.leftXLim = 780;
        mouse.rightXLim = 865;
        mouse.yLim = 305;
        mouse.speed = 150;
        
        mouse = mice.create(1240, 275, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.id = 1;
        mouse.movingRight = false;
        mouse.leftXLim = 1100;
        mouse.rightXLim = 1240;
        mouse.yLim = 305;
        mouse.speed = 150;
        
        mouse = mice.create(1405, 545, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.id = 2;
        mouse.movingRight = true;
        mouse.leftXLim = 1405;
        mouse.rightXLim = 1705;
        mouse.yLim = 575;
        mouse.speed = 200;
        
        mouse = mice.create(1945, 648, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.id = 3;
        mouse.movingRight = true;
        mouse.leftXLim = 1405;
        mouse.rightXLim = 1705;
        mouse.yLim = 575;
        mouse.speed = 300;
        mouse.body.fixedRotation = true; 
        */
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
        
                       // PLATFORMS //
        ///////////////////////////////////////////////////
        /*
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        
        platform = game.add.sprite(300, 700, 'table');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.15, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(950, 335, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.3, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(1550, 600, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.15, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(1950, 700, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.05, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(2100, 350, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.025, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(2650, 150, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.025, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;        
        platform = game.add.sprite(2650, 300, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.025, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;        
        platform = game.add.sprite(2650, 450, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.025, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;        
        platform = game.add.sprite(2650, 600, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.025, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;       
        */
        ///////////////////////////////////////////////////            
    },
    update: function() { 
        moveMittens();
        if (mittens.y > 750) {
            //mittens.reset(125,555)
            killMittens();
        }
        //moveMice();
        //healthText.x = mittens.x;
        //healthText.y = Math.floor(mittens.y - mittens.height);        
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
        if (mouse.id == 3) {
            var y = mouse.y;
            mouse.body.velocity.x = 0;
            if (bottomTouching(mouse)) {
                mouse.body.moveUp(1000);
            }
            if (Math.abs(mouse.x - 1945) > 20) {
                mouse.reset(1945, mouse.y);
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
            if (mouse.x > mouse.rightXLim + 10 || mouse.x < mouse.leftXLim - 10 || mouse.y < mouse.yLim - 10 || mouse.y > mouse.yLim + 10) {
                mouse.reset(mouse.leftXLim, mouse.yLim);
            }
        }
    }
}









