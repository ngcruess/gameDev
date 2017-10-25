var centerX =  vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0, healthText, timer, milliseconds = 0, seconds = 0, minutes = 0, mice, mouseMovingRight = true, sock, sockJumpTimer = 1000, music;

demo.state1 = function() {};
demo.state1.prototype = {
    preload: function() {
        game.load.spritesheet('mittens', '../assets/sprites/mittensSingleFrame.png', 100, 80);
        game.load.image('sidetable', '../assets/images/SideTable.png');
        game.load.image('table', '../assets/images/Table.png');
        game.load.image('shelf', '../assets/images/Shelf.png');
        game.load.image('hitzone', '../assets/images/hitbox.png');
        game.load.image('shot', '../assets/images/projectile.png');
        //game.load.spritesheet('mouse','../assets/sprites/ToyMouse2.png', 390, 180);
        game.load.image('mouse', '../assets/sprites/ToyMouse-1.png')
        game.load.spritesheet('sock','../assets/sprites/EvilSock.png', 280, 450);
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        
        game.load.image('wall', '../assets/images/livingroomwall.png');
        game.load.image('sky', '../assets/images/sky.png');
        game.load.physics('mittensPhysicsData', '../assets/polygons/mittensSingleFrame.json');
        game.load.physics('enemyPhysicsData', '../assets/polygons/Mouse1.json');
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        game.load.physics('mousePhysicsL', '../assets/polygons/ToyMouseL.json')
        game.load.physics('mousePhysicsR', '../assets/polygons/ToyMouseR.json')
        
        game.load.audio('music', '../assets/audio/bgmusic02.mp3');
        
    },
    create: function() {
        
                    // P2 PHYSICS AND ENVIRONMENT //
        ////////////////////////////////////////////////////
        game.world.setBounds(0, 0, 3000, 800);
        game.stage.backgroundColor = '#B25F55';
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        
        var sky = game.add.sprite(0, 0, 'sky');
        sky.scale.setTo(10, 1.5);
        
        var wall = game.add.sprite(0,0, 'wall');
        wall.scale.setTo(10, 10);
        
        //healthText = game.add.text(0, 0, "Health: 100%");
        //healthText.anchor.set(0.5);
        
        var instructionText = game.add.text(100, 80, "KITCHEN -->"); 
        var intoTheAbyss = game.add.text(game.world.width - 700, 80, "ONWARD BROTHER, INTO THE ABYSS -->");
        
        timer = game.add.text(875,0, "00:00:00");
        timer.fixedToCamera = true;
        
        music = game.add.audio('music');
        music.play();
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
        /*
        mittens = game.add.sprite(125,555, 'mittens');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.fixedRotation = true;
        //mittens.body.setZeroDamping();
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysicsData', 'mittensSingleFrame', 1, -Math.PI * 2);
        */
        
        mittens = game.add.sprite(125, 555, 'mittens2');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, true);
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysics', 'ShootingMouth-2', 1, -Math.PI * 2);
        mittens.frame = 3;
        mittens.body.fixedRotation = true;
        mittens.animations.add('left', [0,1,2], 10, true);
        mittens.animations.add('right', [3,4,5], 10, true);
        
        game.camera.follow(mittens);
        mittens.body.onBeginContact.add(mittensHit);
        ///////////////////////////////////////////////////
        
                        //MICE//
        ///////////////////////////////////////////////////
        //mouse = game.add.sprite(790, 265, 'mouse');
        //mouse.scale.setTo(.4, .4);
        //game.physics.p2.enable(mouse, false);
        
        mice = game.add.group();
        mice.enabledBody = true;
        mice.physicsBodyType = Phaser.Physics.P2JS;
        var mouse = mice.create(790, 275, 'mouse');
        //mouse.scale.setTo(.4, .4);
        game.physics.p2.enable(mouse, true);
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
        //mouse.scale.setTo(.4, .4); 
        game.physics.p2.enable(mouse, true);
        //mouse.frame = 4;
        mouse.id = 1;
        mouse.movingRight = false;
        mouse.leftXLim = 1100;
        mouse.rightXLim = 1240;
        mouse.yLim = 275;
        mouse.speed = 150;
        
        mouse = mice.create(1405, 545, 'mouse');
        //mouse.scale.setTo(.4, .4);
        game.physics.p2.enable(mouse, true);
        mouse.id = 2;
        mouse.movingRight = true;
        mouse.leftXLim = 1405;
        mouse.rightXLim = 1705;
        mouse.yLim = 545;
        mouse.speed = 200;
        
        mouse = mice.create(1945, 648, 'mouse');
        //mouse.scale.setTo(.4, .4);
        game.physics.p2.enable(mouse, true);
        mouse.id = 3;
        mouse.movingRight = true;
        mouse.leftXLim = 1405;
        mouse.rightXLim = 1705;
        mouse.yLim = 545;
        mouse.speed = 300;
        mouse.body.fixedRotation = true; 
        ///////////////////////////////////////////////////
        
                        //SOCKS//
        ///////////////////////////////////////////////////
        //sock = game.add.sprite(0, 0, 'sock');
        //sock.scale.setTo(.4, .4);
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
        ///////////////////////////////////////////////////            
    },
    update: function() { 
        moveMittens();
        if (mittens.y > 750) {
            mittens.reset(125,555)
        }
        moveMice();
        //healthText.x = mittens.x;
        //healthText.y = Math.floor(mittens.y - mittens.height);        
        updateTimer();
        if (mittens.x > 2750){
            game.state.start("state2");
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
            if (bottomTouching(mouse)) {
                mouse.body.moveUp(1000);
            }
            if (Math.abs(mouse.x - 1945) > 10) {
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









