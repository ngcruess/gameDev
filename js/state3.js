var centerX = 300, centerY = 200, vel = 100, jumpvel = -300, sock, mittens, socksKilled = 0;

demo.state3 = function() {};
demo.state3.prototype = {
    preload: function() {
        game.load.spritesheet('evilSock', '../assets/spritesheets/EvilSock.png', 3200, 3200);
        game.load.spritesheet('mittens', '../assets/spritesheets/BatCat.png', 400, 320);
        game.load.image('sidetable', '../assets/sprites/SideTable.png');
        game.load.image('table', '../assets/sprites/Table.png');
        game.load.image('shelf', '../assets/sprites/Shelf.png');
        game.load.image('hitzone', '../assets/sprites/hitbox.png');
    },
    create: function() {
        game.stage.backgroundColor = '#3d7c48';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 2500, 400);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;   
        
        platforms = game.add.group();
        platforms.enableBody = true;
        
        enemies = game.add.group();
        enemies.enableBody = true;
        
        mittens = game.add.sprite(0,0, 'mittens');
        mittens.scale.setTo(0.2, 0.2);
        mittens.frame = 2;
        game.physics.enable(mittens);
        mittens.body.gravity.y = 300;
        mittens.body.collideWorldBounds = true;
        mittens.animations.add('walkRight', [2,3]);
        mittens.animations.add('walkLeft', [0,1]);
        
        var sideTable = platforms.create(550, 400, 'sidetable');
        sideTable.anchor.setTo(0.5, 1);
        sideTable.body.immovable = true;
        sideTable.scale.setTo(0.07, 0.07);
        
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
        
        
        game.camera.follow(mittens);
        
    },
    update: function() {
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
    }
};