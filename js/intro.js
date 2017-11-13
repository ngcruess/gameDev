//var demo = {}, spaceKey, button;
var spaceKey, cbutton;
demo.intro = function(){};
demo.intro.prototype= {
    preload: function(){
        game.load.image('mittens','../assets/sprites/BatCat.png');
        game.load.image('doubleJump','../assets/images/textdoublejump.png');
        game.load.image('walkt','../assets/images/textwalk.png');  game.load.image('keys','../assets/sprites/arrowkeys.png');
        game.load.image('bg','../assets/images/yellowbg.png');
       
         game.load.spritesheet ('cbutton','../assets/buttons/continuespritesheet.png',107, 44);
        game.load.image('shelfStandard', '../assets/images/shelfStandard.png');
        game.load.spritesheet('mittens2', '../assets/sprites/WalkingM.png', 90, 86);
        
        game.load.physics('mittensPhysics', '../assets/polygons/Mittens.json');
        
        
    },
    create: function(){
        //game.stage.backgroundColor = '#B25F55';
//        game.stage.backgroundColor = '#3d7c48';
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
        
        shelf = game.add.sprite(900, 188, 'shelfStandard');
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        shelf = game.add.sprite(1300, 468, 'shelfStandard');
        shelf.scale.setTo(3, 1);
        game.physics.p2.enable(shelf, false);
        shelf.body.static = true;
        
        
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

        
//        var titleText = game.add.text(game.world.width / 2, 30, {fontsize: '256px', fill: '#FFFFFF', align: 'center'});     
//        updateAnchor(0.5, 0.5, titleText)
//        var subtitleText1 = game.add.text(30, 70, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
//        var subtitleText2 = game.add.text(30, 110, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
//        var subtitleText3 = game.add.text(30, 180, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
//        var subtitleText4 = game.add.text(30, 250, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
//        var actionPrompt = game.add.text(game.world.width /2 , game.world.height - 100, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
//        updateAnchor(0.5, 0.5, actionPrompt);
//        
      
//        subtitleText1.text = "You are Mittens, the mischievously imaginative warrior cat. ";
//        subtitleText2.text = "Use the arrow keys to navigate the house. Press the up arrow to jump, \nand again to jump once while in the air."
//        subtitleText3.text = "Press space to attack, but be careful! Some enemies are too powerful \nto be destroyed."
//        subtitleText4.text = "Always remember: the floor is lava!"
//        actionPrompt.text = "[Press SPACE to continue]"
//        
        //var mittens = game.add.sprite(game.world.width / 2, game.world.height /2, 'mittens');
//        updateAnchor(0.5, 0.5, mittens);
//        mittens.scale.setTo(1.25, 1.25);
//        
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        moveMittens();
        if (mittens.y > 500) {
            mittens.reset(108, 343);
        }
    }
    
};