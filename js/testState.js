var centerX =  vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0, healthText, timer, milliseconds = 0, seconds = 0, minutes = 0, mice, mouseMovingRight = true, sock, sockJumpTimer = 1000, music, death;

var map, white, black, blackCollisionGroup, mittensCollisionGroup, tileObjects;

demo.state00 = function() {};
demo.state00.prototype = {
    preload: function() {
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        game.load.tilemap('tileTest', '../assets/tilemaps/tileTest.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileTestWhite', '../assets/images/tileTestWhite.png');
        game.load.image('tileTestBlack', '../assets/images/tileTestBlack.png');
    },
    create: function() {
        game.world.setBounds(0, 0, 6400, 800);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution =0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        blackCollisionGroup = game.physics.p2.createCollisionGroup();
        mittensCollisionGroup = game.physics.p2.createCollisionGroup();
        
        map = game.add.tilemap('tileTest');
        map.addTilesetImage('tileTestWhite', 'tileTestWhite');
        map.addTilesetImage('tileTestBlack', 'tileTestBlack');
                
        white = map.createLayer('White');
        black = map.createLayer('Black');
        
        map.setCollisionBetween(2, 2, true, 'Black');
        
        white.resizeWorld();
        
        tileObjects = game.physics.p2.convertTilemap(map, black);
        for (var i = 0; i < tileObjects.length; i++) {
            var tileBody = tileObjects[i];
            tileBody.setCollisionGroup(blackCollisionGroup);
            tileBody.collides(mittensCollisionGroup);
        }
        
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode)
            if (e.keyCode == 38){
                jumpRel = true;
            } 
        }  
        
        cursor = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        mittens = game.add.sprite(400, 555, 'mittens2');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysics', 'ShootingMouth-2', 1, -Math.PI * 2);
        mittens.frame = 3;
        mittens.body.fixedRotation = true;
        mittens.animations.add('left', [0,1,2], 10, true);
        mittens.animations.add('right', [3,4,5], 10, true);
        mittens.invincible = false;
        mittens.flight = true;
        mittens.body.setCollisionGroup(mittensCollisionGroup);
        mittens.body.collides(blackCollisionGroup);
        
        game.camera.follow(mittens);
        mittens.body.onBeginContact.add(mittensHit);        
    },
    update: function() {
        moveMittens();
    }
};