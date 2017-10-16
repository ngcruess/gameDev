var centerX =  vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0, healthText, timer, milliseconds = 0, seconds = 0, minutes = 0, mouse, mouseMovingRight = true;

demo.state3 = function() {};
demo.state3.prototype = {
    preload: function() {
        game.load.spritesheet('mittens', '../assets/sprites/mittensSingleFrame.png', 100, 80);
        game.load.image('sidetable', '../assets/images/SideTable.png');
        game.load.image('table', '../assets/images/Table.png');
        game.load.image('shelf', '../assets/images/Shelf.png');
        game.load.image('hitzone', '../assets/images/hitbox.png');
        game.load.image('shot', '../assets/images/projectile.png');
        game.load.spritesheet('mouse','../assets/sprites/ToyMouse2.png', 390, 180);
        
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
        mittens = game.add.sprite(125,555, 'mittens');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.fixedRotation = true;
        //mittens.body.setZeroDamping();
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysicsData', 'mittensSingleFrame', 1, -Math.PI * 2);
        game.camera.follow(mittens);
        mittens.body.onBeginContact.add(mittensHit);
        ///////////////////////////////////////////////////
        
                        //MICE//
        ///////////////////////////////////////////////////
        mouse = game.add.sprite(790,265,'mouse');
        mouse.scale.setTo(.4, .4);
        game.physics.p2.enable(mouse, false);
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
        
        platform = game.add.sprite(950, 325, 'shelf');
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
        /*
        if (shootButton.isDown) {
            mittensShoot();
        }
        */
        if (mittens.y > 765) {
            mittens.reset(125,555)
        }
        if (mouseMovingRight && mouse.x < 995) {
            mouse.body.moveRight(200);
        }
        else if (mouse.x > 790) {
            mouse.body.moveLeft(200);
        }
        if (mouse.x >= 995) {
            mouseMovingRight = false;
            mouse.frame = 0;
        }
        else if (mouse.x <= 790) {
            mouseMovingRight = true;
            mouse.frame = 4;
        }
        if (mouse.x > 1015 || mouse.x < 775 || mouse.y < 255 || mouse.y > 275) {
            mouse.reset(790, 265);
        }
        healthText.x = mittens.x;
        healthText.y = Math.floor(mittens.y - mittens.height);
        
        updateTimer();
    }
};
function mittensHit(body, bodyB, shapeA, shapeB, equation) {
    if (body == null) {
        return
    }
    if (body.sprite.key == 'mouse') {
        mittens.reset(125,555);
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









