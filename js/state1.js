var centerX =  vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0, healthText, timer, milliseconds = 0, seconds = 0, minutes = 0, mice, mouseMovingRight = true, sock, sockJumpTimer = 1000, music, death, shelf, turrets, turretBullets, turretShotTimer = 4000;
demo.state1 = function() {};
demo.state1.prototype = {
    preload: function() {
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.image('shot', '../assets/images/turretShot.png');
        game.load.image('mouse', '../assets/sprites/ToyMouse-1.png')
        game.load.image('turret', '../assets/sprites/mrShootyTall_v2.png');
        game.load.spritesheet('sockSheet','../assets/sprites/EvilSock.png', 90, 135);
        game.load.image('sockL', '../assets/sprites/EvilSockL.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        game.load.image('portal', '../assets/sprites/portal.png');
        
        game.load.image('wall', '../assets/images/livingroomwall.png');
        game.load.image('sky', '../assets/images/sky.png');
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        game.load.physics('mousePhysicsL', '../assets/polygons/ToyMouseL.json')
        game.load.physics('mousePhysicsR', '../assets/polygons/ToyMouseR.json')
        
        game.load.audio('death', '../assets/audio/mittensDeath.wav');
        
    },
    create: function() {
        
        state1Deaths ++;
        
                    // P2 PHYSICS AND ENVIRONMENT //
        ////////////////////////////////////////////////////
        game.world.setBounds(0, 0, 6000, 800);
        game.stage.backgroundColor = '#B25F55';
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        
        var sky = game.add.sprite(0, 0, 'sky');
        sky.scale.setTo(10, 1.5);
        
        var wall = game.add.sprite(0,0, 'wall');
        wall.scale.setTo(10, 10);
        
        wall = game.add.sprite(3000,0, 'wall');
        wall.scale.setTo(10, 10);
        
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
        
        shelf = game.add.sprite(1340, 160, 'shelfStandard');
        shelf.scale.setTo(0.32, 10);
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
        
        shelf = game.add.sprite(5275, 516, 'shelfStandard');
        shelf.scale.setTo(7.0, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        //Portal
        portal = game.add.sprite(5575, 300, 'portal');
        ////////////////////////////////////////////////////
        
        timer = game.add.text(1355, 0, "00:00:00");
        timer.fixedToCamera = true;
        var deathText = "Deaths: " + state1Deaths
        deaths = game.add.text(1355, 30, deathText);
        deaths.fixedToCamera = true;
        
        
        death = game.sound.add('death');
        death.startTime = 200;
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
        
        
                        // MITTENS //
        ///////////////////////////////////////////////////
        if (state1Section == 0) {
            mittens = game.add.sprite(125, 525, 'mittens2');
        }
        else if (state1Section == 1) {
            mittens = game.add.sprite(1812, 447, 'mittens2');
        }
        else if (state1Section == 2) {
            mittens = game.add.sprite(3360, 263, 'mittens2');
        }
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
        turrets = game.add.group();
        
        var turret = turrets.create(600, 557, 'turret');
        game.physics.p2.enable(turret, false);
        turret.body.fixedRotation = true;
        turret.body.static = true;
        turret.nextShot = 4000;
        turret.shotDelay = 2000;
        turret.lastShot = 0;
        turret.shootL = false;
        turret.shootR = true;
        turret.shootU = true;
        
        turret = turrets.create(1990, 158, 'turret');
        game.physics.p2.enable(turret, false);
        turret.body.fixedRotation = true;
        turret.body.static = true;
        turret.nextShot = 4000;
        turret.shotDelay = 2000;
        turret.lastShot = 0;
        turret.shootL = true;
        turret.shootR = true;
        turret.shootU = true;        
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
        
        mouse = mice.create(5400, 450, 'mouse');
        game.physics.p2.enable(mouse, false);
        mouse.body.clearShapes();
        mouse.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        mouse.body.fixedRotation = true;
        mouse.id = 8;
        mouse.movingRight = true;
        mouse.leftXLim = 3800;
        mouse.rightXLim = 4406;
        mouse.yLim = 188;
        mouse.speed = 1000;        
        ///////////////////////////////////////////////////
        
                        //BULLETS//
        ///////////////////////////////////////////////////
        turretBullets = game.add.group();
        turretBullets.createMultiple(100, 'shot', false);
        turretBullets.setAll('anchor.x', 0.5);
        turretBullets.setAll('anchor.y', 0.5);
        turretBullets.setAll('outOfBoundsKill', true);
        turretBullets.setAll('ckeckWorldBounds', true);
        ///////////////////////////////////////////////////       
        
        //game.time.events.repeat(Phaser.Timer.SECOND *2, 1000, turretShoot, this);
    },
    update: function() { 
        //console.log(mittens.x, mittens.y)
        moveMittens();
        turretShoot();
        checkForCheckpoints();
        if (mittens.y > 750) {
            killMittens();
        }
        moveMice();     
        updateTimer();
        if (mittens.x > 5575 && mittens.y > 300){
            game.state.start("state1b");
        }
        if (bottomTouching(mittens)) {
            jumps = 2;
        }
    }
};
function checkForCheckpoints() {
    if (mittens.x > 1818 && mittens.x < 1868) {
        if (mittens.y > 440 && mittens.y < 460 ) {
            state1Section = 1
        }
    }
}