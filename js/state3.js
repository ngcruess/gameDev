var socks;

demo.state3 = function() {};
demo.state3.prototype = {
    preload: function() {
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.image('shot', '../assets/images/turretShot.png');
        game.load.image('mouse', '../assets/sprites/ToyMouse-1.png')
        game.load.image('turret', '../assets/sprites/mrShootyTall_v2.png');
        game.load.spritesheet('sockSheet','../assets/sprites/EvilSock.png', 90, 135);
        game.load.image('sockL', '../assets/sprites/EvilSockL.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        game.load.image('portal', '../assets/sprites/portal.png');
        
        game.load.image('wall', '../assets/images/BasementWall.png');
        game.load.image('sky', '../assets/images/sky.png');
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        game.load.physics('mousePhysicsL', '../assets/polygons/ToyMouseL.json')
        game.load.physics('mousePhysicsR', '../assets/polygons/ToyMouseR.json')
        
        game.load.audio('death', '../assets/audio/mittensDeath.wav');
        
    },
    create: function() {
        game.world.setBounds(0, 0, 6000, 800);
        game.stage.backgroundColor = '#fff';
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        wall = game.add.sprite(0,0, 'wall');
        wall.scale.setTo(10, 10);
        
        wall2 = game.add.sprite(3000, 0, 'wall');
        wall2.scale.setTo(10, 10);
        
        portal = game.add.sprite(5900,400, 'portal');
        
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
        mittens = game.add.sprite(200, 400, 'mittens2');
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
        ///////////////////////////////////////////////////
        
        
        
        
    
        
        socks = game.add.group();
        socks.enabledBody = true;
        socks.physicsBodyType = Phaser.Physics.P2JS;
        
        var sock = socks.create(800, 0, 'sockSheet');
        game.physics.p2.enable(sock, false);
        sock.body.clearShapes();
        sock.body.loadPolygon('mousePhysicsL', 'ToyMouse-1', 1, -Math.PI * 2);
        sock.body.fixedRotation = true;
        sock.id = 0;
        sock.movingRight = false ;
        sock.leftXLim = 429;
        sock.rightXLim = 579;
        sock.yLim = 316;
        sock.speed = 150;
        
        /////////////// PLATFORMS /////////////////
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        shelf = game.add.sprite(196, 600, 'shelfStandard');
        shelf.scale.setTo(1.84, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(250, 344, 'shelfStandard');
        shelf.scale.setTo(5.04, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(650, 450, 'shelfStandard');
        shelf.scale.setTo(0.4, 22);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(850, 200, 'shelfStandard');
        shelf.scale.setTo(0.4, 20);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(775, 800, 'shelfStandard');
        shelf.scale.setTo(1.84, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1100, 700, 'shelfStandard');
        shelf.scale.setTo(1.84, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2000, 500, 'shelfStandard');
        shelf.scale.setTo(3, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1040, 300, 'shelfStandard');
        shelf.scale.setTo(3.75, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2150, 340, 'shelfStandard');
        shelf.scale.setTo(0.4, 11);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1800, 150, 'shelfStandard');
        shelf.scale.setTo(10, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(2500, 700, 'shelfStandard');
        shelf.scale.setTo(3.75, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(3300, 450, 'shelfStandard');
        shelf.scale.setTo(.5, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(4000, 250, 'shelfStandard');
        shelf.scale.setTo(.5, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(4700, 250, 'shelfStandard');
        shelf.scale.setTo(1, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
        shelf = game.add.sprite(5750, 600, 'shelfStandard');
        shelf.scale.setTo(5, 1);
        game.physics.p2.enable(shelf, false);
        //shelf.body.setMaterial(platformMaterial);
        shelf.body.static = true;
        
    },
    update: function() {
        moveMittens();
        if (bottomTouching(mittens)) {
            jumps = 2;
        }
    }
    
};