var demo = {}, spaceKey, sbutton, title;
var state1Music;
demo.state0 = function(){};
demo.state0.prototype= {
    preload: function(){
        game.load.image('mittens','../assets/sprites/BatCat.png');
        game.load.spritesheet('title','../assets/sprites/titleanimation.png', 550, 200);
        game.load.spritesheet ('sbutton','../assets/buttons/startspritesheet.png',71, 44);
         
        game.load.audio('state1Music', '../assets/audio/bgmusic02.mp3');
    },
    create: function(){
        //game.stage.backgroundColor = '#B25F55';
        game.stage.backgroundColor = '#000'; 
        game.physics.startSystem(Phaser.Physics.P2JS);
        sbutton = game.add.button(game.world.centerX-50, 400, 'sbutton', function actionOnClick(){
            game.state.start('intro');
            state1Music.play();
            state1Music.loopFull();
        }, this, 1,0,1,2);
        sbutton.onInputOver.add(over, this);
        sbutton.onInputOut.add(out, this);
        sbutton.onInputUp.add(up, this);
        sbutton.onInputDown.add(down, this);
        sbutton.input.useHandCursor = true;
        sbutton.scale.setTo(1.5,1.5);
        title = game.add.sprite(game.world.centerX, game.world.centerY-200, 'title');
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        title.scale.setTo(2, 2);
        
        var tail = title.animations.add('tail');
        title.animations.play('tail', 4,true);
        state1Music = game.sound.add('state1Music');
        state1Music.allowMultiple = false;
        
//        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
//        if (spaceKey.isDown) {
//            console.log('SPACE');
//            game.state.start('state1');
//            state1Music.play();
//            state1Music.loopFull();
//        } 
    }
};