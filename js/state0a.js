var vacuum, jumpRel, timer, healthText;

demo.state0a = function() {};
demo.state0a.prototype = {
    preload: function(){
        game.load.image('mittens', '../assets/sprites/mittensSingleFrame.png');
        game.load.image('platform', '../assets/images/block.png');
        game.load.image('shot', '../assets/images/projectile.png');
        game.load.image('vacuum', '../assets/sprites/Vacuum.png');
        game.load.image('background', '../assets/images/brick.png');
        game.load.spritesheet('mittensSheet', '../assets/spritesheets/BatCat.png', 100, 80);
        
        game.load.physics('mittensPhysicsData', '../assets/polygons/mittensSingleFrame.json');
    },
    create: function(){
        //Physics settings
        game.physics.startSystem(Phaser.Physics.P2JS);                
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        //Input feedback
        game.input.keyboard.onUpCallback = function (e) {
            console.log(e.keyCode)
            if (e.keyCode == 38){
                jumpRel = true;
            }
            
        }
        //World items
        var background = game.add.sprite(0,0, 'background');
        background.scale.setTo(10, 10);
        
        platform = game.add.sprite(200, 400, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(300, 525, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(300, 275, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        platform = game.add.sprite(200, 650, 'platform');
        updateAnchor(.5, .5, platform);
        platform.scale.setTo(1.25, .2);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        /*
        SPRITES
        */
        //Mittens
        mittens = game.add.sprite(153,354,'mittens');
        updateAnchor(0.5, 0.5, mittens);
        game.physics.p2.enable(mittens, false);
        mittens.body.fixedRotation = true;
        mittens.body.clearShapes();
        mittens.body.loadPolygon('mittensPhysicsData', 'mittensSingleFrame', 1, -Math.PI * 2); 
       
        //Vacuum
        vacuum = game.add.sprite(700,400,'vacuum');
        vacuum.anchor.x = 0.5;
        vacuum.anchor.y = 0.5;  
        game.physics.p2.enable(vacuum);
        vacuum.body.data.gravityScale = 0;
        vacuum.body.static = true;
        
        //Bullets        
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
        //Input tools        
        cursor = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);  
       
        //come back to this...
        //create timer to initiate movement every 4 secs
//        timer = game.time.create(false);
//        timer.loop(4000, vacuumMovement, this);
//        timer.start();
//=======
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        
        //Materials
        var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', mittens.body);
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        
        healthText = game.add.text(16, 16, 'health: 100', { fontSize: '32px', fill: '#000' });
    },
    update: function(){
        healthText.text = 'Health: ' + mittens.health;
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            mittensFacingLeft = false;
            mittens.body.moveRight(mittensRunSpeed);
            mittens.scale.setTo(1, 1);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            mittensFacingLeft = true;
            mittens.body.moveLeft(mittensRunSpeed);
            mittens.scale.setTo(-1, 1);
        }
        else{
            mittens.body.velocity.x = 0;
            mittens.animations.stop();
        }
        if (cursor.up.isDown && jumpRel) {
            mittensJump();
            jumpRel = false;
        }        
        if (shootButton.isDown) {
            mittensShoot();
            mittens.health -= 10; 
        }
        
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
function bulletHit(target) {
    bullet = this;
    if (target != mittens.body) {
        bullet.kill();
    }
}

//will come back to this...
//function vacuumMovement(){
//    vacuum.x = game.rnd.integerInRange(600, 800);
//    vacuum.y = game.rnd.integerInRange(200, 400);
//}