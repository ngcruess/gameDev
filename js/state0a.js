demo.state0a = function() {};
demo.state0a.prototype = {
    preload: function(){
        game.load.spritesheet('mittens', '../assets/spritesheets/BatCat.png',400,300);
        game.load.image('platform', '../assets/sprites/hitbox.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.P2JS);
        
        game.stage.backgroundColor = '#B25F55';
                
        game.physics.p2.gravity.y = 750;
        game.physics.p2.defaultRestitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        mittens = game.add.sprite(0,0, 'mittens');
        mittens.scale.setTo(0.15, 0.15);
        mittens.frame = 2;
        mittens.animations.add('walkRight', [2]);
        mittens.animations.add('walkLeft', [1]);
        game.physics.p2.enable(mittens);
        mittens.body.fixedRotation = true;
        mittens.body.setZeroDamping();
        
        //game.camera.follow(mittens);
        
        var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', mittens.body);
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        
        var platform = game.add.sprite(500, 400, 'platform');
        updateAnchor(.5, .5, platform);
        game.physics.p2.enable(platform);
        platform.body.setMaterial(platformMaterial);
        platform.body.static = true;
        
        cursor = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            mittens.body.moveRight(400);
            mittens.animations.play('walkRight', 14, true);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            mittens.body.moveLeft(400);
            mittens.animations.play('walkLeft', 14, true);
        }
        else{
            mittens.body.velocity.x = 0;
            mittens.animations.stop();
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            mittens.body.moveUp(400);
        }
    }
};