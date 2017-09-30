var sky, mittens, mouse, counters, hitzones, spaceKey, attackTime = 0, attacking = false, facing, mice, toaster, killzones, miceKilled = 0;

demo.state1 = function(){};
demo.state1.prototype = { 
    preload: function(){
        game.load.spritesheet('mittens','../assets/spritesheets/BatCat.png', 400, 300);
        game.load.spritesheet('mouse','../assets/spritesheets/toyMouse.png', 98, 49);
        game.load.image('sky', '../assets/sprites/sky.png');
        game.load.image('counter', '../assets/sprites/kitchenCounterCropped.png');
        game.load.image('hitzone', '../assets/sprites/hitbox.png');
        game.load.image('sink', '../assets/sprites/kitchenSink.png');
        game.load.image('toaster', '../assets/sprites/toaster.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.stage.backgroundColor = '#DDDDDD';
        
        //Background and Art
        var sky = game.add.sprite(0, 0, 'sky');
        sky.scale.setTo(1.2, 1.2);
        
        counters = game.add.group();
        var counter = counters.create(0, game.world.height - 100,'counter');
        updateAnchor(.5, .5, counter);
        var counter = counters.create(game.world.width - 100, game.world.height - 100,'counter');
        updateAnchor(.5, .5, counter);
        counter = counters.create(0, 0, 'counter');
        updateAnchor(.5, .5, counter);
        counter.scale.setTo(.75, .75);
        counter = counters.create(game.world.width , 0, 'counter');
        updateAnchor(.5, .5, counter);
        counter.scale.setTo(.75, .75);
        
        //Environment
        hitzones = game.add.group();
        hitzones.enableBody = true;
        var hitzone = hitzones.create(450, 475, 'hitzone');
        hitzone.scale.setTo(30, 1);
        updateAnchor(.5, .5, hitzone);
        hitzone.body.immovable = true;
        hitzone = hitzones.create(game.world.width - 202, game.world.height / 2 + 12, 'hitzone');
        hitzone.scale.setTo(4,1);
        hitzone.body.immovable = true;
        
        killzones = game.add.group();
        killzones.enableBody = true;
        var killzone = killzones.create(game.world.width / 2, game.world.height / 2 + 80,'hitzone');
        updateAnchor(.5, .5, killzone);
        killzone.body.immovable = true;
        killzone.scale.setTo(4, .75);
        
        toaster = game.add.sprite(game.world.width - 232, game.world.height / 2 - 156 , 'toaster');
        toaster.scale.setTo(1.75,2); 
        
        var sink = game.add.sprite(game.world.width / 2 - 128, 320, 'sink');
        sink.scale.setTo(2,1); 
        
        
        //Movables
        mittens = game.add.sprite(15, 360, 'mittens');
        mittens.scale.setTo(.33, .33);
        mittens.animations.add('left', [1], 10, true);
        mittens.animations.add('right', [2], 10, true);
        mittens.animations.add('attackLeft',[0]);
        mittens.animations.add('attackRight',[3]);
        game.physics.enable(mittens);
        mittens.body.gravity.y = 300;
        mittens.body.collideWorldBounds = true;
        
        mice = game.add.group();
        mice.enableBody = true;
        var mouse = mice.create(game.world.width - 100, 310, 'mouse');
        mouse = mice.create(game.world.width / 2 - 230, 400, 'mouse');
        
        cursor = game.input.keyboard.createCursorKeys();
        
        //Button will be used to attack
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        var collideHitzone = game.physics.arcade.collide(mittens, hitzones);
        game.physics.arcade.collide(mittens, toaster);
        game.physics.arcade.overlap(mittens, mice, fight, null, this);
        game.physics.arcade.collide(mittens, killzones, killMittens, null, this);
        mittens.body.velocity.x = 0;
        
        if (game.time.now > attackTime) {
            attacking = false;
            if (facing == 'LEFT') {
                mittens.animations.play('left');
            }
            else {
                mittens.animations.play('right');
            }
        }        
        if (cursor.left.isDown){
            if (attacking) {
                mittens.animations.play('attackLeft');
            }
            else {
                mittens.animations.play('left');
            }            
            mittens.body.velocity.x = -300;
            facing = 'LEFT';
        }
        else if (cursor.right.isDown) {
            if (attacking) {
                mittens.animations.play('attackRight');
            }
            else {
                mittens.animations.play('right');
            }  
            mittens.body.velocity.x = 300;
            facing = 'RIGHT';
        }
        if (cursor.up.isDown && collideHitzone){
            mittens.body.velocity.y = -250;
        }
        else if (cursor.down.isDown) {
            mittens.body.velocity.y = 350;
        }        
        if (spaceKey.isDown) {
            if (game.time.now > attackTime) {
                attack();
            }
        }
        if (miceKilled === 2) {
            game.state.start('state3');
        }
    }
};