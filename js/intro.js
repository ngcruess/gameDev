var spaceKey, cbutton;
demo.intro = function(){};
demo.intro.prototype= {
    preload: function(){
        game.load.image('mittens','../assets/sprites/BatCat.png');
        game.load.image('doubleJump','../assets/images/textdoublejump.png');
        game.load.image('walkt','../assets/images/textwalk.png'); game.load.image('keys','../assets/sprites/arrowkeys.png');
        game.load.image('bg','../assets/images/yellowbg.png');
        game.load.image('square', '../assets/images/emptySquare.png');
       
        game.load.spritesheet ('cbutton','../assets/buttons/continuespritesheet.png',107, 44);
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        
        
    },
    create: function(){
        game.physics.p2.gravity.y = globalGravity;
        game.physics.p2.restitution = 0;
        game.physics.p2.world.setGlobalStiffness(1e5);
        game.stage.backgroundColor = '#332e31';
        var bg = game.add.sprite(50,100, 'bg');
        bg.scale.setTo(20, 12);
        cbutton = game.add.button(game.world.centerX,game.world.centerY +300, 'cbutton', function actionOnClick(){
            game.state.start('state1');
        }, this, 1,0,1,2);
        cbutton.anchor.x = 0.5;
        cbutton.anchor.y = 0.5;
        cbutton.onInputOver.add(over, this);
        cbutton.onInputOut.add(out, this);
        cbutton.onInputUp.add(up, this);
        cbutton.onInputDown.add(down, this);
        cbutton.input.useHandCursor = true;
        cbutton.scale.setTo(1.5, 1.5);
        
        var keys = game.add.sprite(game.world.width / 4, game.world.height*3 / 4, 'keys')
        keys.anchor.x = 0.5;
        keys.anchor.y = 0.5;
        
        var doubleJump = game.add.sprite(game.world.width /3 +80, game.world.height * 2.5 /4, 'doubleJump')
        doubleJump.anchor.x = 0.5;
        doubleJump.anchor.y = 0.5;
        
        var walkt = game.add.sprite(game.world.width / 4 + 50, game.world.height * 3.8 /5, 'walkt')
        walkt.anchor.x = 0.5;
        walkt.anchor.y = 0.5;
        
        var walkt2 = game.add.sprite(game.world.width * 2.8 / 5 + 3 , game.world.height * 3.8 /5, 'walkt')
        walkt2.anchor.x = 0.5;
        walkt2.anchor.y = 0.5;
        
                        //PLATFORMS//
        ///////////////////////////////////////////////////
        shelf = game.add.sprite(200, 468, 'shelfStandard');
        shelf.scale.setTo(3, 1);
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(500, 328, 'shelfStandard');
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(700, 468, 'shelfStandard');
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(900, 196, 'shelfStandard');
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1300, 468, 'shelfStandard');
        shelf.scale.setTo(3, 1);
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        ///////////////////////////////////////////////////
        
                            //INVISIBLE BOUNDS//
        ///////////////////////////////////////////////////
        var box = game.add.sprite(45, 290, 'square');
        box.scale.setTo(1, 38);
        game.physics.p2.enable(box, false);
        box.body.static = true;
        
        box = game.add.sprite(750, 95, 'square');
        box.scale.setTo(150, 1);
        game.physics.p2.enable(box, false);
        box.body.static = true;
        
        box = game.add.sprite(1455, 290, 'square');
        box.scale.setTo(1, 38);
        game.physics.p2.enable(box, false);
        box.body.static = true;
        
        ///////////////////////////////////////////////////
        
        
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
        
                        // MITTENS //
        ///////////////////////////////////////////////////
        mittens = game.add.sprite(108, 343, 'mittens2');
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
  
    },
    update: function(){
        moveMittens();
        if (mittens.y > 500) {
            mittens.reset(108, 343);
        }
    }
    
};