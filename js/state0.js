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
        }, this, 1,0,3,1);
        sbutton.onInputOver.add(over, this);
        sbutton.onInputOut.add(out, this);
        sbutton.onInputUp.add(up, this);
        sbutton.onInputDown.add(down, this);
        sbutton.input.useHandCursor = true;
        var titleText = game.add.text(game.world.width / 2, 30, {fontsize: '256px', fill: '#FFFFFF', align: 'center'});     
        updateAnchor(0.5, 0.5, titleText)
        var subtitleText1 = game.add.text(30, 70, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        var subtitleText2 = game.add.text(30, 110, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        var subtitleText4 = game.add.text(30, 180, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        var actionPrompt = game.add.text(game.world.width /2 , game.world.height - 100, {fontsize: '128px', fill: '#CCCCCC', align: 'center'});
        updateAnchor(0.5, 0.5, actionPrompt);
        
        titleText.text = "That Cat Mittens";
        subtitleText1.text = "You are Mittens, the mischievously imaginative warrior cat. ";
        subtitleText2.text = "Use the arrow keys to navigate the house. Press the up arrow to jump, \nand again to jump once while in the air."
        subtitleText4.text = "Always remember: the floor is lava!"
        actionPrompt.text = "[Press SPACE to continue]"
        
        var mittens = game.add.sprite(game.world.width / 2, game.world.height /2, 'mittens');
        updateAnchor(0.5, 0.5, mittens);
        mittens.scale.setTo(1.25, 1.25);
        
        state1Music = game.sound.add('state1Music');
        state1Music.allowMultiple = false;
        
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        if (spaceKey.isDown) {
            console.log('SPACE');
            game.state.start('state1');
            state1Music.play();
            state1Music.loopFull();
        } 
    }
};