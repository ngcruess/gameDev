demo.state0a = function() {};
demo.state0a.prototype = {
    preload: function(){
        game.load.image('mittens', '../assets/sprites/mittensSingleFrame.png');
        game.load.image('platform', '../assets/images/block.png');
        
        game.load.physics('mittensCollision', '../assets/polygons/mittensSingleFrame.json');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.P2JS);
        
        game.stage.backgroundColor = '#B25F55';
                
        game.physics.p2.gravity.y = 1000;
        game.physics.p2.defaultRestitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        mittens = game.add.sprite(164,365, 'mittens');
        mittens.scale.setTo(0.15, 0.15);
        //mittens.animations.add('walkRight', [2]);
        //mittens.animations.add('walkLeft', [1]);
        game.physics.p2.enable(mittens, true);
        mittens.body.fixedRotation = true;
        //mittens.body.setZeroDamping();
        //mittens.body.clearShapes();
        //mittens.body.loadPolygon('mittensCollision', 'mittens');
        
        //game.camera.follow(mittens);
        
        var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', mittens.body);
        var platformMaterial = game.physics.p2.createMaterial('platformMaterial');
        
        var platform = game.add.sprite(200, 400, 'platform');
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
        
        cursor = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            mittens.body.moveRight(400);
            mittens.scale.setTo(-0.15, 0.15);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            mittens.body.moveLeft(400);
            mittens.scale.setTo(0.15, 0.15);
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