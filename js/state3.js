var centerX =  vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0, healthText, timer, milliseconds = 0, seconds = 0, minutes = 0;

demo.state3 = function() {};
demo.state3.prototype = {
    preload: function() {
        game.load.spritesheet('evilSock', '../assets/sprites/EvilSock.png', 3200, 3200);
        game.load.spritesheet('mittens', '../assets/sprites/mittensSingleFrame.png', 100, 80);
        game.load.image('sidetable', '../assets/images/SideTable.png');
        game.load.image('table', '../assets/images/Table.png');
        game.load.image('shelf', '../assets/images/Shelf.png');
        game.load.image('hitzone', '../assets/images/hitbox.png');
        game.load.image('shot', '../assets/images/projectile.png');
        
        game.load.image('wall', '../assets/images/livingroomwall.png');
        game.load.image('sky', '../assets/images/sky.png');
        game.load.physics('mittensPhysicsData', '../assets/polygons/mittensSingleFrame.json');
        
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
        
        healthText = game.add.text(0, 0, "Health: 100%");
        healthText.anchor.set(0.5);
        
        timer = game.add.text(875,0, "00:00:00");
        timer.fixedToCamera = true;
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
        mittens = game.add.sprite(0,0, 'mittens');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, true);
        mittens.body.fixedRotation = true;
        //mittens.body.setZeroDamping();
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysicsData', 'mittensSingleFrame', 1, -Math.PI * 2);
        game.camera.follow(mittens);
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
        
        platform = game.add.sprite(600, 700, 'table');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.15, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(1000, 350, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.15, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(1400, 600, 'sidetable');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.15, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(1800, 350, 'shelf');
        updateAnchor(.5, 1, platform);
        platform.scale.setTo(0.15, 0.15);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
  
        
        ///////////////////////////////////////////////////
        
        
        
        
        /* ARCADE STUFF
        mittens.frame = 2;
        game.physics.enable(mittens);
        mittens.body.gravity.y = 300;
        mittens.body.collideWorldBounds = true;
        mittens.animations.add('walkRight', [2,3]);
        mittens.animations.add('walkLeft', [0,1]);
        */
        
        //var sideTable = platforms.create(550, 400, 'sidetable');
        /*
        var sideTable = platforms.create(550, 400, 'sidetable');
        sideTable.anchor.setTo(0.5, 1);
        sideTable.body.immovable = true;
        sideTable.scale.setTo(0.07, 0.07)7
        
        var shelf = platforms.create(500, 306, 'shelf');
        shelf.anchor.setTo(0.5,1);
        shelf.scale.setTo(0.07, 0.07);
        shelf.body.immovable = true;
        
        
        var shelf2 = platforms.create(800, 150, 'shelf');
        shelf2.anchor.setTo(0.5, 1);
        shelf2.scale.setTo(0.07, 0.07);
        shelf2.body.immovable = true;
        
        var table = platforms.create(1000, 400, 'table');
        table.anchor.setTo(0, 1);
        table.scale.setTo(.07, .07);
        table.body.immovable = true;
        
        sock0 = enemies.create(300, 400, 'evilSock');
        sock0.anchor.setTo(0.5, 1);
        sock0.scale.setTo(0.03, 0.03); 
        game.physics.enable(sock0);
        sock0.body.gravity.y = 300;
        sock0.body.collideWorldBounds = true;
        
        
        sock = enemies.create(800, 0, 'evilSock');
        sock.anchor.setTo(0.5, 1);
        sock.scale.setTo(0.03, 0.03); 
        game.physics.enable(sock);
        sock.body.gravity.y = 300;
        sock.body.collideWorldBounds = true;
        
        sock2 = enemies.create(1100, 0, 'evilSock');
        sock2.anchor.setTo(0.5, 1);
        sock2.scale.setTo(0.03, 0.03);
        game.physics.enable(sock2);
        sock2.body.gravity.y = 300;
        sock2.body.collideWorldBounds = true;
        */
        
        
        
        
                
    },
    update: function() { 
        moveMittens();
        
        if (shootButton.isDown) {
            mittensShoot();
        }
        
        healthText.x = mittens.x;
        healthText.y = Math.floor(mittens.y - mittens.height);
        
        updateTimer();
        
        
        
        
        /*
        mittens.body.velocity.x = 0;
        game.physics.arcade.collide(mittens, platforms);
        game.physics.arcade.collide(enemies, platforms);
        
        game.physics.arcade.collide(mittens, enemies, murder, null, this);
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            mittens.body.velocity.x = vel;
            mittens.animations.play('walkRight', 14, true);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            mittens.body.velocity.x = -vel;
            mittens.animations.play('walkLeft', 14, true);
        }
        else{
            mittens.animations.stop();
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            mittens.body.velocity.y = jumpvel;
        }
        
        function murder(mittens, enemies){
            socksKilled += 1;
            enemies.kill();
        }
        */
    }
};
function mittensHit(body, bodyB, shapeA, shapeB, equation) {
    if (body == null) {
        return
    }
    if (body.sprite.key == 'platform') {
        mittens.reset(0,0);
    }
}


function updateTimer() {
    minutes = Math.floor(game.time.now/60000)% 60;
    seconds = Math.floor(game.time.now/1000) % 60;
    milliseconds = Math.floor(game.time.now) % 100;
    
    if (milliseconds < 10) { milliseconds = "0" + milliseconds};
    if (seconds < 10) { seconds = '0' + seconds};
    if (minutes <10) { minutes = '0' + minutes};
    timer.setText(minutes + ":" + seconds + ":" + milliseconds);
    
}










