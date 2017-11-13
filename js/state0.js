var demo = {}, spaceKey, sbutton;
var state1Music;
demo.state0 = function(){};
demo.state0.prototype= {
    preload: function(){
        game.load.image('mittens','../assets/sprites/BatCat.png');
        game.load.spritesheet ('sbutton','../assets/buttons/startspritesheet.png',71, 44);
        game.load.audio('state1Music', '../assets/audio/bgmusic02.mp3');
    },
    create: function(){
        //game.stage.backgroundColor = '#B25F55';
        game.stage.backgroundColor = '#3d7c48'; 
        game.physics.startSystem(Phaser.Physics.P2JS);
        sbutton = game.add.button(game.world.centerX-50, 400, 'sbutton', function actionOnClick(){
            game.state.start('intro');
            state1Music.play();
            state1Music.loopFull();
        }, this, 1,0,3,1);
        sbutton.onInputOver.add(over, this);
        sbutton.onInputOut.add(out, this);
        sbutton.onInputUp.add(up, this);
        sbutton.onInputDown.add(down, this);
        sbutton.input.useHandCursor = true;
        
   
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